# Project detail pages QA

final result: passed

Scope: add dedicated content-driven project stories within the new portfolio. No new reference image accompanied the request, so the existing palette, fonts, gallery layout, and supplied project screenshots were the visual target. This is an original continuation of the portfolio, not a claimed reference clone.

## Visual evidence

- design/project-detail/medark-desktop.png: production desktop cover and hierarchy, CSS1360x1000.
- design/project-detail/gallery-desktop.png: full screenshot beside an explicitly captioned close-up, with sticky section navigation.
- design/project-detail/stack-and-next.png: full stack and next-project link.
- design/project-detail/medark-mobile.png: production phone layout, CSS390x844. No horizontal overflow.
- design/project-detail/image-viewer.png and image-viewer-mobile.png: native modal image viewer.
- design/project-detail/time-wise-mobile.png: second project and longer title.

The desktop hero, cover, gallery and stack views were inspected. Phone layout keeps title, actions, cover caption and section links readable. Main screenshots preserve their ratio; the second Medark/Time Wise images are explicitly described as crops of the same screenshot, not different screens. No timelines, client identities, roles, metrics or results were fabricated. Highlights are based on existing descriptions.

## Interaction checks

- Homepage preview and title links open /projects/[slug]. Live and source actions remain separate.
- All projects returns to /#projects; next-project navigation opens Time Wise from Medark.
- The shared header's desktop/mobile links return to homepage sections, including /#contact.
- Gallery opens a native dialog, initially focuses Close, cycles to the next image, closes with Escape, and restores focus to the original image button. Phone open/close and no overflow verified.
- Section links scroll to the corresponding content; sticky navigation remains visible.
- Final production browser error log is empty.

One development-only image performance notice appeared when the same image was used in the preloaded cover and lazy gallery/viewer. The cover uses Next Image preload and fixed aspect ratio; no broken image or functional issue was observed. This is not a visual or navigation blocker.

## Automated validation

Run node design/project-detail/check-routes.mjs with the local production server running. Passed: all11 routes return200; overview/gallery/stack and JSON-LD are in server HTML; canonicals are present; sitemap and llms.txt include each route; homepage links to the detail page; unknown slug returns404.

Focused ESLint, production build, TypeScript, and git diff --check passed. All11 pages are statically generated. No src/legacy changes. New route is src/app/projects/[slug]/page.tsx; story fields and labels live in src/content/project-details.ts via the content adapter. Project supports optional story, highlights, gallery and facts fields for the future CMS. No MongoDB, admin authentication or Cloudinary upload system was added. Existing homepage Icons8 credit remains intact.
