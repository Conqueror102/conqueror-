# Project gallery QA

final result: passed

Scope: redesign the existing project cards into an exhibition-style collection, keeping the established portfolio palette/fonts, real screenshots and factual content. Source is the existing project section, not an external reference clone.

The layout now alternates a wide split spotlight with paired showcases. Typographic project names, layered screenshot crops on wide entries, authentic stack logos, concise summaries and clear live/source actions add visual hierarchy. Main screenshots preserve their aspect ratio; the small secondary crop is intentionally zoomed. No paper illustrations, fabricated metrics, or new project claims were added.

Evidence: design/projects/desktop-spotlight.png, desktop-gallery.png, mobile-spotlight.png, mobile-details.png. Desktop CSS1360x1000 and phone CSS390x844; screenshots capture the native visible app viewport and may not contain the full height of the section.

Browser checks:
- Initial selection shows four featured entries.
- Client website filter shows four matching entries; Web application shows six; Learning project shows one (Gentle Men).
- Everything restores the selected collection; Explore the full collection shows all11; Show selected projects restores four.
- Tab reaches the next filter with a visible focus outline, and Space activates it.
- Native project notes open/close with Enter and reveal full overview and stack. Phone notes also open by click.
- No horizontal overflow at desktop or phone widths. No browser errors or warnings observed in the final page checks.
- Existing live/repository destinations and external-link protections retained. External websites themselves were not audited.

Visual fixes: moved the duplicated category label out of the lower preview overlap; main screenshot uses contain/its original ratio; increased spotlight height and raised paired previews to preserve their full frame inside the stage. The final captures show the corrected spacing.

Cards are server components. The small ProjectCollection island handles filtering/counts/expansion; all11 card bodies remain in the SSR DOM. Project facts/images are from src/content/projects.ts, interface copy is from homeContent.projects, and brand marks reuse the existing content logo library. Reduced motion removes preview transitions.

Focused ESLint, final production build, TypeScript and diff checks passed. No src/legacy changes. Main preview runs on port3000.
