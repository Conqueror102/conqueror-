# Homepage design QA

Date: 2026-10-16

## Latest scope and visual truth

Rework the hero grid using the user's supplied structural reference:
`C:/Users/hp/Downloads/WhatsApp Image 2026-10-16 at 4.26.41 AM.jpeg`.
Keep the accepted transparent character full-height at the left, the small real
brand marks and subtle proximity motion, the existing palette, and Delius/Fredoka.
Add the missing image cards and a changing top-right photo card.

The reference is a desktop design embedded in a phone screenshot, not a mobile
layout to clone. Its native image is 540 × 1200. The relevant 420 × 216 region
(x=60, y=495) is enlarged uniformly to 1260 × 648 in `design/hero/grid-reference.png`.
This low-resolution source establishes card structure, not typography or copy.

Intentional differences: this portfolio uses its established warm palette and
Victor's content. The left character spans all three rows; the reference portrait
spans only two. Contact remains within the right grid to honor the full-height
character request. No floating extra avatar is added outside the grid.

## Evidence and comparison

- Production preview: http://127.0.0.1:3000/.
- Production desktop: `design/hero/grid-desktop-final.png` (1265 × 712 capture;
  CSS viewport 1280 × 720, excluding native scrollbar/panel pixels).
- Combined source and implementation: `design/hero/grid-reference-comparison.png`.
  The implementation's hero region is cropped at x=20, y=86, 1220 × 574 and
  uniformly resized to 1260 px wide. Both views appear together, with no stretching.
- Production phone: `design/hero/grid-mobile-final.png` (374 × 10662 full page;
  CSS viewport 390 × 844).
- Readable phone grid detail: `design/hero/grid-mobile-final-crop.png`.
- Tablet evidence: `design/hero/grid-tablet.png` and `grid-tablet-crop.png`,
  captured during development at CSS 840 × 1000.
- Additional checks: 1440 × 960 and 320 × 760.

Desktop comparison state: homepage, first slide selected, slideshow paused,
closed navigation/FAQ/archive. Final live preview resumes automatic playback.
The combined image is a focused comparison of the complete hero. Its card labels,
photo crops, code, and hierarchy are readable at the saved resolution; the phone
crop additionally verifies small-screen text and controls.

## Comparison history and fixes

1. [P1] The previous five-card right grid omitted the reference's top image and
   middle-row image. Replaced it with eight cards: headline + slideshow; code +
   toolkit + photo; contact + project image + name card. The combined comparison
   now shows the requested row pattern and full-height left character.
2. [P2] Initial laptop layout clipped a few pixels in the headline, stack, and
   contact cards. Reduced compact-height padding and toolkit spacing. Production
   DOM checks at 1280 × 720 show equal client/scroll dimensions for all eight cards;
   the hero including footnote ends at y=712.83 within the 720 px viewport.
3. [P2] Initial personal-photo crop placed its face behind the top label. Adjusted
   the content-owned focal point to 52% 15%. Final desktop and phone captures show
   the face clear of both labels. Slideshow focal points were adjusted too.
4. [P2] On narrow phones, a caption could approach slideshow controls. Moved the
   caption above the controls. The production phone detail shows clear separation.
5. [P2] Focus changed playback state before the pause click could toggle it.
   Track focus separately from the chosen play/pause state. Production testing
   confirms one pause click changes the control to Play, and selecting Photo 2
   activates its image and selected indicator.
6. The first production capture ran before lazy images finished loading. Replaced
   it after confirming every hero image was complete and had a nonzero natural
   width. The final combined comparison uses the loaded capture.

## Required fidelity surfaces

- Typography: established local Delius display type, Fredoka supporting type, and
  JetBrains Mono code are retained. Headline is scaled to its two-column card;
  supporting text wraps without truncation in the checked sizes.
- Layout: eight cards, tight 12 px desktop gutters, aligned row boundaries, and
  consistent rounded corners. The left transparent character remains dominant.
  Tablet stacks the character above the full grid; phone reflows the cards into
  readable one- and two-column rows. No horizontal page overflow was observed.
- Colors: existing peach, cream, cocoa, sunshine, sky, rose, and leaf tokens are
  retained. No new neon/blue glow or gradient layer is introduced.
- Imagery: supplied real photos appear in the slideshow and personal card; a real
  project screenshot appears in the project card with its full width preserved.
  The existing transparent illustration, authentic brand marks, Icons8 assets,
  and visible credit remain. No broken hero image resources were found.
- Content: photos, focal points, captions, slide timing/control labels, and name
  card copy live in `src/content/home.ts`. Profile and project data still come
  through the server content adapter. No legacy components are used or edited.

## Interaction and implementation checks

- Autoplay advances between the two real photos at a 5.5 second interval.
- Photo selection updates the visible slide and aria-pressed state, then pauses.
- Pause/play works; the timer pauses during pointer hover, keyboard focus,
  offscreen visibility, and hidden tabs. Reduced motion disables automatic
  playback and transitions by implementation.
- All three middle cards share a row on desktop and tablet.
- The hero is server-rendered; only the slideshow is a new client island.
- Production console: no warnings or errors in the checked tab.
- Production build, TypeScript, focused ESLint, and whitespace checks passed.
- `git diff --numstat -- src/legacy/` is empty.

OS-level reduced motion was not toggled during browser QA. Offscreen/hidden-tab
pausing was inspected in code rather than manipulating browser visibility. Existing
contact delivery was not exercised; no test message was sent.

## Findings

No actionable P0/P1/P2 findings remain in the latest comparison. The reference's
low-resolution business/team photos are intentionally replaced with the user's
own photos and real work. The established illustration and logo motion are
preserved rather than regenerated.

## Implementation checklist

- [x] Restore eight-card grid and image-rich rows.
- [x] Add changing top-right photo card with selection and pause controls.
- [x] Preserve full-height transparent character and authentic floating marks.
- [x] Keep new content in content modules, with a small slideshow client island.
- [x] Verify production desktop, phone, controls, build, and legacy boundary.
- [x] Leave the production preview running for review.

final result: passed
