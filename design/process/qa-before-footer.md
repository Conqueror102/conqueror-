# Process section QA

Result: passed.

Scope: replace the old four-column process strip with a product-lab concept, responding to the user's rejection of repeating paper artwork. This is a new design direction within the existing portfolio, not a clone of an external mockup.

Four coherent generated sculptures illustrate Discovery, Planning, Development, and Delivery. Glass, champagne chrome, sage, coral, and orange keep the section compatible with the established palette while giving it a different material language. Asset provenance is in public/images/process/SOURCES.md.

Verified in the browser:
- Desktop at 1360px: four-stage selector, corresponding imagery and copy, no horizontal overflow; all four scene images loaded.
- Phone at 390px: two-column selector and stacked scene/details; no horizontal overflow. Planning selection updates the visible panel; copy, outcomes, and contact CTA remain readable.
- Keyboard: ArrowRight advances; Home selects Discovery; End selects Delivery. Focus follows selection. Inactive panels are hidden with associated tab and panel labels.
- Reduced motion disables entry animation and transitions in CSS.
- Production browser console: no errors observed during mobile checks.

Evidence: design/process/desktop-discovery.png, desktop-development.png, mobile-discovery.png, mobile-planning-details.png. Screenshots show the native app viewport; desktop captures may not contain the full height of the section.

Validation: focused ESLint passed; production Next.js build and TypeScript passed. Homepage remains prerendered. git diff --check passed; src/legacy has no changes. All process copy/assets are supplied through src/content and its adapter.

One visual correction: removed multiply blending, which discolored the artwork backdrop. Original studio artwork now displays in its intended colors.
