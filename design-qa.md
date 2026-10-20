# Detailed case-study rebuild QA

final result: passed

User corrected the previous generic project-overview implementation and supplied
a Rentium case-study structure. This rebuild follows that content hierarchy:
executive summary, client, role, services, live product, four metrics, Challenge,
Solution, Key Outcomes, and System Design & Technical Rigor. Architecture includes
an execution pipeline and four substantial engineering subsections.

The exact user-supplied Rentium reference is shown at /projects/rentium as a
clearly labeled demo, excluded from the portfolio collection/sitemap, marked
noindex, and given WebPage rather than a Victor-authored CreativeWork schema.
Its image and source URL are documented in public/images/case-study-demo/SOURCES.md.
The screenshot was downloaded from the URL supplied by the user and converted
to WebP. No claim of independent verification of Rentium's figures is made.

All11 existing project pages use the richer structure with clearly labeled sample
client/role/performance/outcome/architecture content, as authorized by the user.
Content lives in src/content/project-case-studies.ts; the UI contains no project
narrative literals. Sample body content is marked data-nosnippet. Existing factual
page metadata and CreativeWork structured data are retained for the actual projects.

Visual evidence:
- design/case-study/rentium-header.png: client, role, services, summary and demo notice.
- design/case-study/rentium-architecture.png: six connected execution stages and technical heading.
- design/case-study/medark-header.png: the richer structure on an actual project route.
- design/case-study/rentium-mobile-architecture.png: CSS390px, one-column flow and no horizontal page overflow.
Screenshots capture the native visible browser viewport, not the complete long page.

The navigation issue was addressed with a prominent View case study action on
each project card. The previous inline note expander is removed. Preview image,
title and View case study all open the local route. Visit website and Source code
remain clearly separate external actions. Browser checks confirmed the Medark
button opens /projects/medark, with its client/role/services brief present. The
live-site action retains its external URL and _blank target.

The Rentium desktop architecture and phone layout were visually inspected. Six
pipeline stages and all four engineering pillars were confirmed in the DOM.
Production phone browser error log was empty. Existing native image viewer is
preserved; its behavior was verified in the prior project-detail QA.

Focused ESLint and production Next build/TypeScript passed. The production route
check script passes all11 actual routes plus the Rentium demo, checks each rich
section/brief/metric label in SSR HTML, verifies noindex/demo exclusion, original
structured data, sitemap, llms.txt, unknown-slug404 and the explicit case-study
link. Run node design/project-detail/check-routes.mjs. git diff --check passed;
src/legacy remains untouched. Production preview is running on port3000.
