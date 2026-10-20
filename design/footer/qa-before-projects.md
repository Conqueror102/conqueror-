# Footer logo-pile QA

final result: passed

Target: the user's described bottom-of-footer background: many authentic tool logos, uniformly brown, densely stacked beneath a U-shaped upper silhouette. Pointer proximity spreads them; leaving allows falling, collision bounces, and settling.

## Visual evidence

- design/footer/pile-desktop.png: production desktop, CSS1360x1000. Cocoa marks form raised outer banks and a low center, with 268 instances. Existing workspace invitation, photos, wave and email remain clear above.
- design/footer/pile-mobile.png: corrected phone layout, CSS390x844. 92 instances retain the U silhouette without horizontal overflow. The base ends above the copyright strip.
- design/footer/pile-hover.png: pointer repulsion opens the center of the pile. Browser DOM measurements found 240 changed particle transforms during the interaction.

The art uses real local SVG marks as alpha masks tinted with the existing cocoa token. The library reuses all 57 available web/backend/AI/cloud logos. No generated substitute logos or colored logo variants were added. Deterministic static markup is present in SSR; desktop and phone densities are selected with CSS.

## Interaction and verification

Mouse entry starts local repulsion; contacts exchange impulses and rotate. The support field retains the banked shape after motion settles. Browser checks confirmed motion state changes, decorative visitor cursor suppression over the pile, pause, and unchanged transforms while paused. A separate deterministic physics check verifies gravity, collision rebound, recovery after repulsion, the U shape, finite coordinates, and boundaries.

Run: node design/footer/check-pile-physics.mjs
Result: 268 particles; mean displacement 2.866px settled, 12.561px disturbed, 2.850px after recovery. Gravity, rebound, U shape, and boundary checks passed.

Animation is stopped offscreen, in a hidden document, when paused, and for prefers-reduced-motion. It sleeps after settling rather than running continuously. Touch scrolling is preserved and does not activate hover forces. Reduced-motion fallback was checked in source; no OS preference was changed during QA.

One loading issue was found and fixed: long decimal style values were normalized differently by the browser, producing a hydration warning. Initial styles now use fixed precision. Fresh phone and final production desktop browser logs contain no errors or warnings after that fix.

Focused ESLint passed. Final Next production build and TypeScript passed; homepage remains prerendered. git diff --check passed and src/legacy is untouched. Footer attribution, location, copyright, and VS Code link remain on a clear strip below the pile. Main local preview is running on port3000.

## Footer edge refinement

Removed the entire strip below the logo pile at Victor's request, including
copyright, location and VS Code link. Its obsolete CSS and footer imports are
removed. Existing hero Icons8 attribution remains visible; no additional credit
was added to Contact. Production DOM confirms no .footer-bottom element and the
pile bottom exactly matches the footer bottom. Evidence:
design/footer/pile-flush-edge.png. Focused ESLint, production build, TypeScript,
and diff checks passed after this change. This supersedes the earlier note about
a clear strip beneath the pile.
