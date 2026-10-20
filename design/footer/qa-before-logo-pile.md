# Shared-workspace footer design QA

final result: passed

## Target and evidence

Reference: C:/Users/hp/Downloads/91d18a5624ec719520282d1ef6a7af8d.jpg (1000x642). Victor requested the collaborative-canvas concept, with creative freedom, rather than a faithful copy of Miro. This is a portfolio footer adaptation: the reference application toolbar, fictional collaborators, sticky notes, and video-call chrome are intentionally replaced by portfolio navigation, authentic profile destinations, Victor's own supplied photos, and a contact invitation.

Combined visual comparison: design/footer/reference-comparison.png. Both source and implementation were opened, then composited without distortion. The reference is normalized to 750px wide; production screenshot to 1000px wide. Their aspect ratios and content differ intentionally. Desktop CSS viewport: 1360x1000; screenshot: native visible app viewport 1345x865. The desktop image includes the preceding peach section and does not show the lowest copyright row; mobile-bottom.png and DOM inspection verify that row.

## Visual assessment

The scattered cursor labels, left exploration rail, central meeting invitation, personal photos, and playful wave retain the reference's shared-workspace energy. Cream/cocoa, Delius/Fredoka, and restrained warm accents fit the portfolio. The reference's paper-note treatment is omitted in response to the user's fatigue with that motif. Content hierarchy and a clear primary CTA are retained amid the scattered composition. No actionable P0/P1/P2 issue was found in the combined comparison.

Phone evidence: design/footer/mobile-top.png and mobile-bottom.png at CSS390x844. Floating content is deliberately rearranged around the central invitation; captions and action remain readable, with no horizontal overflow or overlaps observed. The second small photo is hidden on phones to retain space.

## Interaction checks

- Start a conversation navigates to #contact.
- Back to the top navigates to #home.
- Existing GitHub, LinkedIn, and X URLs verified against content; email uses the profile address. External profile links use noopener/noreferrer.
- Keyboard Tab from the main CTA reaches GitHub with a visible focus outline.
- Visitor cursor activates after a mouse move, is decorative and ignores pointer events, and hides on pointer leave. Touch pointer events are ignored; reduced motion disables the cursor and drifting/transitions.
- No missing footer images or page overflow in production desktop DOM checks.
- No browser errors observed during phone interaction checks.
- Icons8 attribution, copyright, and /vscode edition link retained.

## Validation and assets

Focused ESLint passed. Next production build and TypeScript passed, with homepage prerendered. git diff --check passed; no src/legacy changes. Footer content is server rendered; only the decorative cursor wrapper is a client component. All user-facing copy, destinations, photo configuration, and art paths are in src/content/home.ts.

New artwork: public/images/footer/wave.png, generated using the built-in image_gen tool; exact prompt/provenance in public/images/footer/SOURCES.md. The optimized wave.webp is 33,480 bytes with alpha preserved. Existing Icons8 social marks and Victor's photographs are reused.
