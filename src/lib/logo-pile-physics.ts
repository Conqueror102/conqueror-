export type PileSlot = { x: number; y: number; scale: number; angle: number; logo: number }
export type PileBody = { x: number; y: number; homeX: number; homeY: number; vx: number; vy: number; angle: number; spin: number; restAngle: number; radius: number }
export type PilePointer = { x: number; y: number; active: boolean }

const noise = (n: number) => { const value = Math.sin(n * 127.1 + 311.7) * 43758.5453; return value - Math.floor(value) }

/** Dense layers with a low center and taller banks. Deterministic for SSR. */
export function createPileSlots(columns: number, rows: number, logoCount: number): PileSlot[] {
  const slots: PileSlot[] = []
  if (!logoCount) return slots
  for (let row = 0; row < rows; row++) for (let col = 0; col < columns; col++) {
    const seed = row * columns + col
    const x = (col + .4 + (row % 2) * .4) / columns
    const y = 1 - (row + .3) / rows
    const curve = .06 + .55 * (1 - (x * 2 - 1) ** 2)
    if (y < curve) continue
    slots.push({ x: x + (noise(seed + 4) - .5) * .3 / columns, y: y + (noise(seed + 8) - .5) * .2 / rows, scale: .88 + noise(seed + 2) * .55, angle: (noise(seed + 3) - .5) * 1.5, logo: (seed * 17 + row * 11) % logoCount })
  }
  return slots
}

export function createPileBodies(slots: PileSlot[], width: number, height: number, columns: number): PileBody[] {
  const unit = Math.min(width / columns, height / 12 * 1.2)
  return slots.map(slot => ({ x: slot.x * width, y: slot.y * height, homeX: slot.x * width, homeY: slot.y * height, vx: 0, vy: 0, angle: slot.angle, restAngle: slot.angle, spin: 0, radius: unit * slot.scale * .32 }))
}

/** Low gravity, elastic support, circle contacts, and local pointer repulsion. */
export function stepPile(bodies: PileBody[], dt: number, width: number, height: number, pointer: PilePointer): number {
  const gravity = 65
  const damping = Math.exp(-1.65 * dt)
  const reach = Math.min(145, width * .3)
  for (const body of bodies) {
    body.vx += (body.homeX - body.x) * 1.5 * dt
    // A soft support below each settled layer preserves the banked silhouette.
    body.vy += (gravity + Math.min(0, (body.homeY - body.y) * 23)) * dt
    if (pointer.active) {
      const dx = body.x - pointer.x, dy = body.y - pointer.y
      const distance = Math.hypot(dx, dy)
      if (distance < reach) {
        const force = (1 - distance / reach) ** 2 * 2300
        body.vx += dx / Math.max(1, distance) * force * dt
        body.vy += (dy / Math.max(1, distance) - .65) * force * dt
        body.spin += dx / reach * force * .002 * dt
      }
    }
    body.vx *= damping; body.vy *= damping
    body.x += body.vx * dt; body.y += body.vy * dt
    body.spin += (body.restAngle - body.angle) * 2 * dt
    body.spin *= Math.exp(-2 * dt)
    body.angle += body.spin * dt
  }
  const cell = Math.max(...bodies.map(body => body.radius * 2)) + 2
  for (let pass = 0; pass < 2; pass++) {
    const grid = new Map<string, number[]>()
    bodies.forEach((body, index) => {
      const key = `${Math.floor(body.x / cell)},${Math.floor(body.y / cell)}`
      const bucket = grid.get(key)
      if (bucket) bucket.push(index); else grid.set(key, [index])
    })
    bodies.forEach((a, i) => {
      const cx = Math.floor(a.x / cell), cy = Math.floor(a.y / cell)
      for (let gx = cx - 1; gx <= cx + 1; gx++) for (let gy = cy - 1; gy <= cy + 1; gy++) {
        for (const j of grid.get(`${gx},${gy}`) ?? []) {
          if (j <= i) continue
          const b = bodies[j], dx = b.x - a.x, dy = b.y - a.y
          const distance = Math.hypot(dx, dy), contact = a.radius + b.radius
          if (distance >= contact) continue
          const nx = distance > .001 ? dx / distance : 1, ny = distance > .001 ? dy / distance : 0
          const overlap = (contact - distance) * .51
          a.x -= nx * overlap; a.y -= ny * overlap
          b.x += nx * overlap; b.y += ny * overlap
          const speed = (b.vx - a.vx) * nx + (b.vy - a.vy) * ny
          if (speed < 0) {
            const impulse = -speed * .74
            a.vx -= impulse * nx; a.vy -= impulse * ny
            b.vx += impulse * nx; b.vy += impulse * ny
            a.spin -= impulse * ny * .007; b.spin += impulse * nx * .007
          }
        }
      }
    })
  }
  let energy = 0
  for (const body of bodies) {
    if (body.x < body.radius) { body.x = body.radius; body.vx = Math.abs(body.vx) * .45 }
    if (body.x > width - body.radius) { body.x = width - body.radius; body.vx = -Math.abs(body.vx) * .45 }
    if (body.y < body.radius) { body.y = body.radius; body.vy = Math.abs(body.vy) * .35 }
    if (body.y > height - body.radius * .65) { body.y = height - body.radius * .65; body.vy = -Math.abs(body.vy) * .48; body.vx *= .96 }
    energy += body.vx ** 2 + body.vy ** 2
  }
  return energy / Math.max(1, bodies.length)
}
