# Atlas background design QA

final result: passed

Source visual truth: C:/Users/hp/.codex/generated_images/01a142a9-3529-7fd1-afb8-17a77da20ec6/exec-6eb5ad6e-cf02-4c05-9bd2-1979500dd74e.png (1036×1518).
Implementation: design/skill-graph/atlas/desktop.png (1345×865 capture; CSS viewport1360×1000). Phone: mobile.png at CSS390×844. Native browser screenshots reflect the desktop app's visible surface rather than the requested full height.

Scope: apply the selected map background and centered heading treatment while preserving the existing real-logo graph, content, relationships and interactions. Original graph coordinates and actual portfolio copy intentionally remain; this is not a replacement with the generated mock's invented node placements or duplicate Vercel.

## Comparison evidence
- design/skill-graph/atlas/comparison.png places the source upper region and rendered upper region in the same input. Source crop1036×1000 normalized to600px wide; implementation normalized to780px wide, preserving aspect ratios. Reviewed heading, spacing, warm palette, paper texture, contour/background hierarchy and logo readability. Existing node layout is intentionally more compact than the generated concept.
- Focused background and label details are readable in desktop.png; lower apricot region inspected in deployment.png. Separate phone capture verifies wrapping and bounded map scrolling.
- Artwork: header1003×1568 and dedicated stage1358×1158. Stage art aspect1.173 matches the live1280/1090 canvas without warping.

## Findings and iteration history
- Initial phone header background showed color neighborhoods too early, creating a strong transition into the map. Increased header background scale from1250px to2100px to keep its text area cream. Re-captured mobile.png; transition now stays quiet. No remaining actionable P0/P1/P2 findings.
- Fonts retain local Delius and Fredoka. Spacing uses centered heading and focus controls, without changing surrounding About content. Palette matches yellow/sage/rose/apricot; live labels use translucent cream backing. Artwork is crisp, and all50 authentic logos loaded. Existing content stays in src/content/.

## Functional verification
- AWS selection highlights four direct connections; Escape clears selection.
- Deployment focus control works; phone page width375px stays within390px viewport. Background pans with the map.
- Existing reduced-motion/offscreen behavior remains intact; background itself is static.
- Production build including TypeScript passed; focused ESLint passed. Production browser console had no errors.
- Homepage remains statically prerendered and legacy files have no changes.

## Follow-up polish
No blocking issues. Texture density can be adjusted in a later visual refinement if desired.
