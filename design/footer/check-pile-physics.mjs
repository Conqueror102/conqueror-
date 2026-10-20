import fs from "node:fs"
import assert from "node:assert/strict"
import ts from "typescript"

const source = fs.readFileSync("src/lib/logo-pile-physics.ts", "utf8")
const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 } }).outputText
const { createPileSlots, createPileBodies, stepPile } = await import(`data:text/javascript;base64,${Buffer.from(compiled).toString("base64")}`)
const inactive = { x: 0, y: 0, active: false }
const slots = createPileSlots(38, 12, 57)
assert(slots.length > 200)
const banks = slots.filter(p => p.x < .12 || p.x > .88)
const center = slots.filter(p => Math.abs(p.x - .5) < .1)
assert(Math.min(...center.map(p => p.y)) > Math.min(...banks.map(p => p.y)) + .3)
assert.deepEqual(createPileSlots(38, 12, 0), [])

const bodies = createPileBodies(slots, 1360, 390, 38)
const displacement = () => bodies.reduce((sum, body) => sum + Math.hypot(body.x - body.homeX, body.y - body.homeY), 0) / bodies.length
for (let i = 0; i < 360; i++) stepPile(bodies, 1 / 60, 1360, 390, inactive)
const before = displacement()
for (let i = 0; i < 90; i++) stepPile(bodies, 1 / 60, 1360, 390, { x: 540, y: 290, active: true })
const scattered = displacement()
for (let i = 0; i < 1200; i++) stepPile(bodies, 1 / 60, 1360, 390, inactive)
const settled = displacement()
assert(scattered > before + 3, "Pointer must push the pile apart")
assert(settled < scattered / 2, "The pile must return and settle after the pointer leaves")
assert(bodies.every(body => Number.isFinite(body.x + body.y + body.angle) && body.x >= body.radius - .01 && body.x <= 1360 - body.radius + .01 && body.y <= 390 - body.radius * .65 + .01), "Particles must remain finite and inside the stage")

const collision = [100, 130].map((x, index) => ({ x, y: 100, homeX: x, homeY: 100, vx: index ? -60 : 60, vy: 0, angle: 0, restAngle: 0, spin: 0, radius: 20 }))
stepPile(collision, 1 / 60, 500, 300, inactive)
assert(collision[0].vx < 0 && collision[1].vx > 0, "Approaching particles must rebound after contact")
const falling = [{ ...collision[0], x: 250, homeX: 250, y: 60, homeY: 170, vx: 0, vy: 0 }]
stepPile(falling, 1 / 60, 500, 300, inactive)
assert(falling[0].vy > 0, "An elevated particle must fall under gravity")
console.log(JSON.stringify({ logos: slots.length, before, scattered, settled, UShape: true, rebound: true, gravity: true, bounded: true }))
