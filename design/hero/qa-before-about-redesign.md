# Hero portrait and logo expansion QA

Date: 2026-10-16

## Latest request and source truth

Restore the character's height and add more authentic technology logos, including
AI engineering stacks. Preserve the accepted eight-card right grid, warm palette,
fonts, transparent portrait, and existing slow drift/proximity effect.

Baseline: `design/hero/grid-desktop-final.png` (1265 × 712, CSS 1280 × 720).
Earlier structural reference: `design/hero/grid-reference.png`.
The preceding grid QA is preserved in `design/hero/qa-grid-before-portrait-expansion.md`.

## Evidence and normalization

- Production: http://127.0.0.1:3000/.
- Desktop full page: `design/hero/portrait-expanded-full.png` (1264 × 7058).
- Desktop hero crop: `design/hero/portrait-expanded-final.png` (1264 × 900).
- Combined before/after: `design/hero/portrait-height-comparison.png`
  (1264 × 1632). Baseline above, revised hero below. Both use CSS 1280 × 720;
  widths are normalized with a one-pixel crop, without stretching. The new crop
  extends lower because the restored artwork and separate caption need more height.
- Phone: `design/hero/portrait-expanded-mobile-final.png` (374 × 880 crop from
  a 374 × 10966 full-page capture; CSS 390 × 844).
- Additional checks: CSS 320 × 760, and desktop 1280 × 960.

Both comparison views are the homepage with closed menus/disclosures. The unchanged
slideshow is on different real-photo slides due to autoplay; this is not judged
as a fidelity mismatch. The review focuses on portrait height, density, placement,
card structure, and caption separation. Full-size desktop and phone details were
opened as well as the combined comparison.

## Comparison history and fixes

1. [P1] The compact laptop hero reduced the portrait's stage to approximately
   400px. Restore the desktop grid minimum to 650px and let the portrait use the
   full grid height. Move the caption below the artwork. Browser measurements now
   show 650px for both portrait stage and right grid at 1280 × 720. At 1280 × 960,
   both are 800px. The final comparison shows the larger character clearly.
2. [P2] The old 20-logo field did not include AI engineering tools. Added 20
   authentic AI/data/automation marks, for 40 unique logos. All assets are local,
   exist on disk, and load with nonzero natural width in the production browser.
3. [P2] An upper logo approached the portrait kicker on narrow phones. Moved the
   kicker to the stage's top edge and repositioned Git and Weights & Biases. The
   final phone image shows the heading clear of logos.
4. [P2] A centered cover crop could trim an elbow at very narrow widths. Shifted
   the focal point to 58% bottom. Checked the character at 320px and 390px widths;
   the face, laptop, and arms remain visible.
5. Capture-only issue: the first full-page desktop capture preceded the settled
   compositor state after viewport changes and omitted the portrait. Replaced it
   after checking the actual rendered image and recapturing the settled viewport.
   The final comparison contains the complete character.

## Required fidelity surfaces

- Typography: Delius, Fredoka, and JetBrains Mono retained. Name caption remains
  readable below the artwork and wraps naturally on the narrowest phone.
- Layout: character spans the full height beside the eight-card grid; caption
  no longer reduces its stage. The left track is slightly wider. The intentionally
  taller hero extends below a 720px viewport rather than shrinking the artwork.
  On phones, artwork and caption precede the card grid. No horizontal page overflow
  or clipped right-grid contents appeared in the checked states.
- Colors: established palette and brand colors retained. No added neon, colored
  glow, or gradient layer. Background around the character remains transparent.
- Imagery: original cutout is unchanged; only its rendered scale/framing changed.
  All 40 decorative logos use authentic Simple Icons 16.35.0 SVGs, with provenance
  in `public/icons/brands/SOURCES.md`. Icons8 attribution remains; the later social-card change is documented below.
- Content: expanded logo names, positions, dimensions, and depth remain in
  `src/content/home.ts`; no skills/experience claims were added to the profile.

## Interaction and verification

- Slow drift and proximity motion remain active with all 40 marks. Production
  pointer testing showed nearby new AI logos scaling smoothly above 1.05 and 1.10.
- Browser image checks: 40 marks, none missing; complete portrait with nonzero
  natural dimensions. Face stays free of logo overlap in reviewed captures.
- Production console: no warnings or errors.
- Production build, standalone TypeScript, focused ESLint, and whitespace checks pass.
- `git diff --numstat -- src/legacy/` is empty.
- Reduced motion/offscreen behavior remains unchanged; OS preference not toggled.

## Findings

No actionable P0/P1/P2 issues remain after the final visual comparison.

## Implementation checklist

- [x] Restore full-height, bolder character and place the name below it.
- [x] Expand 20 logos to 40 with authentic AI/data/automation assets.
- [x] Preserve subtle motion, transparency, fonts, palette, and Icons8 credit.
- [x] Verify laptop/phone visuals, production assets, interaction, and checks.
- [x] Leave production preview running.


## Social card update

The user requested that the toolkit card become social icons for X, LinkedIn,
GitHub, Instagram, Facebook, Gmail, and TikTok. When asked for missing profile
URLs, the user explicitly chose icons only. The four known destinations are
linked; Instagram, Facebook, and TikTok use decorative, named icons with no
invented URLs. Visible icon labels are replaced by accessible names/tooltips.

- Title: “Let’s connect.” All seven Icons8 assets are saved in
  public/icons/socials/ with source URLs and visible card/footer attribution.
- Copy and hrefs live in src/content/home.ts, deriving existing accounts from
  profile data. Rendering remains on the server; no new client component.
- Production screenshot: design/hero/social-card-desktop.png (CSS 1280 × 720).
- Phone detail: design/hero/social-card-phone.png (CSS 320 × 760).
- All seven assets loaded. Card client/scroll height is 250/250 on the phone;
  no horizontal page overflow or desktop clipping observed.
- Existing palette, eight-card structure, 650px portrait stage, and 40 drifting
  marks are preserved. Console clean; production build, TypeScript within the
  build, focused ESLint, whitespace, and legacy-boundary checks passed.

final result: passed
