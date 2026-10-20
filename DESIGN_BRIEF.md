# Portfolio design brief

Updated: 2026-10-16

## Product and collaboration

This website is Victor Onyemaechi's personal portfolio. The assistant should take
the creative lead as a product designer and implementation partner, working with
Victor on the direction. Victor will provide further references as the work
develops. Use those references to understand the desired creativity and visual
quality while developing a distinct identity for this portfolio.

## Established visual foundation

- Main font: Delius.
- Secondary font: Fredoka.
- Palette: peach and cream backgrounds, deep cocoa text, sunshine yellow primary
  actions, and green, pink, blue, and orange accents.
- The InsightPod images supplied in this conversation establish the palette;
  their podcast content and page layout are not requirements for this portfolio.
- Color tokens live in `src/app/globals.css`; font loading lives in
  `src/app/layout.tsx`.

## Creative direction

Create an expressive, polished portfolio with a recognizable visual identity.
Aim for the craft and completeness of a finished product. Communicate Victor's
personality and work through typography, composition, illustration, imagery,
and interaction.

Use a substantial, coherent family of illustrations, graphic elements, icons,
and reusable UI components. Explore distinctive section compositions, visual
storytelling, playful details, and purposeful motion. Avoid making every section
the same conventional grid of rectangular cards. Creative freedom is encouraged;
each element should contribute to the portfolio's story or usability.

Use real images where they improve the presentation. Custom generated artwork
and Icons8 icons or illustrations are welcome when appropriate. Select assets
that fit the established palette and illustration style. The existing Icons8
component and credit helper live in `src/components/icons/icons8.tsx`; preserve
the attribution required by the assets actually used.

## Quality expectations

Make projects, skills, and contact paths easy to understand and use. Carry the
visual identity through navigation, buttons, forms, loading states, and mobile
layouts. Maintain readable text, accessible contrast, keyboard access, reduced
motion support where needed, and sensible asset loading.

## Where to work (important)

Build the new portfolio fresh. Do not edit anything in `src/legacy/`: that is the
old VS Code / client portfolio, kept untouched and served only at `/vscode`.

- Homepage: `src/app/page.tsx`
- Layout pieces (header, footer): `src/components/layout/`
- Homepage sections: `src/components/home/` (hero is `hero.tsx`; add `about.tsx`,
  `projects.tsx`, `services.tsx`, `faq.tsx`, `contact.tsx` next to it)
- Shared UI pieces: `src/components/ui/`
- Content comes from `src/content/` (later from the admin/database), never hard-coded.

## Current stage

The new hero and the about, projects, services, FAQ, contact, and footer sections
are built in the new component structure. An earlier legacy restyle was reverted
and kept only as reference in `design/legacy-restyle-reference.patch`.

The portrait stands directly on the page background, with no light panel. A
separate transparent cutout preserves the Arsenal jersey and MacBook pose.
Forty authentic Simple Icons brand marks form a small, loosely scattered field
around it. They drift slowly like asteroids. Pointer proximity gently expands and
displaces nearby marks as a fluid local bulge, then eases them back. Keep this
subtle; the motion itself creates the blob-like impression. Respect reduced
motion and pause animation when the portrait is offscreen.

The hero keeps the transparent character full-height on the left, sharing the
full height of the right grid (650px minimum on desktop). Its name caption sits
below the grid, rather than reducing the artwork's stage. The expanded logo field
includes AI engineering, data, and automation marks alongside the web stack.
Its right grid
has eight cards: headline and photo slideshow; code, social icons, and a personal photo;
then contact, project preview, and a name card. The slideshow uses real supplied
photos, changes every 5.5 seconds, and offers photo selection and pause/play.
It pauses on hover, keyboard focus, offscreen, and hidden tabs; reduced motion
disables automatic playback. Photos, captions, and controls live in content.

The social card replaces the former toolkit card. It shows Icons8 marks for X,
LinkedIn, GitHub, Instagram, Facebook, Gmail, and TikTok. Existing X/LinkedIn/GitHub
profiles and the email address are linked. At Victor's request, platforms without
provided profile URLs are decorative icons until their hrefs are supplied in
`src/content/home.ts`; never invent usernames or profile destinations.

The About section follows Victor's corrected Portfolio reference (a70820dd image):
a cream presentation board, side navigation rail, notched rose identity card with
a grayscale cutout, oversized Portfolio heading, paper-cut flamingo artwork, a
two-part stats column, and three lower tiles with the sculpture/yellow overlap.
Project and skill counts derive from content; no reference awards or client logos
are presented as Victor's credentials. Biography, interests, and the full skills
list follow below. The header signature reads PORTFOLIO. About is server-rendered;
all imagery, labels, and link configuration are in content. Built-in ImageGen
assets and exact prompts live under `public/images/about/`.

The cream About surface now continues below the mosaic into a dark green
notebook composition (4b916776 reference). The main biography and interests are
editable text on a generated blank curled paper sheet, with four smaller
handwritten notes beneath it. Those note images, copy, rotation, and contact CTA
are content-driven. No finance-site header or reference marketing copy is used.
The skills list follows outside the extended cream surface.

The page and sections render on the server. Only portrait motion, the slideshow,
mobile navigation, email copying, and form submission use client components. Homepage
copy lives in `src/content/home.ts`; factual data remains in the existing content
modules. `src/lib/portfolio-content.ts` is the adapter to replace when the future
admin/database source is ready. New work does not modify legacy.

The toolbox now uses a content-driven knowledge graph in `skill-graph.tsx`, with
three main hubs (Frontend, Backend, AI engineering), 39 authentic local logos,
and 49 curated relationships. JavaScript/Node, Rust/Tokio/Actix, PHP/Laravel,
and Python/AI form connected branches. Hover or keyboard focus traces direct
connections; tap pins a node and Escape or Clear selection resets it. Ecosystem
controls focus the map; phones can swipe horizontally without overflowing the
page. Nodes and edges drift together, pausing offscreen, in hidden tabs, and for
reduced motion. Graph content, layout, relationships, and labels live in
`src/content/skill-graph.ts`; the surrounding About remains server-rendered.

Deployment is the fourth graph hub, with authentic AWS, Google Cloud and Azure
logos plus Docker, Kubernetes, Terraform, GitHub Actions, Git, Vercel, Netlify,
DigitalOcean, Render and Cloudinary. The expanded canvas preserves the existing
branches. Ecosystem controls also bring the selected hub into vertical view.
AWS/Azure artwork comes from Devicon; its license and source URLs are stored
next to the logos. The graph now contains 50 technology marks and 74 relations.


The toolbox retains the original peach dotted graph background. At Victor’s
request, its heading uses the centered arrangement from the map exploration:
small letter-spaced kicker, large title, centered description, centered
ecosystem controls, then the interaction hint. No map artwork is used.

Homepage additions after Projects: Outside the IDE (alternating image/write-up
stories for speaking/community and writing), client/team testimonials, and a
deeper capabilities section at the existing #services anchor. User authorized
placeholders until actual event material and exact quotes arrive. Story previews
and testimonial slots are explicitly marked; no invented event history, client
quotes, names, company logos or ratings are used. All data lives in
src/content/journey.ts via the existing content adapter. These sections are server
components. A real supplied portrait and a generated paper notebook illustration
are used as preview imagery. Projects remains unchanged for the next design pass.

Testimonials now follow the a74a4bbb reference: an evergreen drafting-grid
pinboard with a centered cream heading, floating paper notes, sparse stickers
and a curved connecting thread. The three notes surround the headline on
desktop and stack on mobile. Generated pinboard/cream paper assets live in
public/images/testimonials/ with prompts; existing rose/yellow paper is reused.
All copy, paper paths and contact link remain in src/content/journey.ts. There
are no invented client logos or quotes. CTA points to Contact; placeholder
status remains visible. The original reference’s unrelated navigation and brand
trust strip are replaced by the portfolio heading and working principles.

Victor refined the testimonial board to cocoa brown and edge-to-edge. The
background now belongs to the full-width outer section with no exterior
padding/frame. Three generated sample profile headshots replace empty glyphs;
preview copy identifies them as sample portraits until real content arrives.
Updated artwork/provenance is in public/images/testimonials/.

The process section now uses a distinct product-lab direction. Victor rejected
repeating paper artwork across the page. This section uses four generated studio
sculptures in glass, chrome, and warm palette colors, clean editorial type, and
an accessible four-stage selector. Keep its visual language free of paper,
stickers, notebooks, and collage. Original Discovery, Planning, Development, and
Delivery descriptions are preserved. Copy, outcomes, images, and CTA are in
src/content/services.ts; ProcessSection is server rendered and ProcessExplorer is
the small interactive client island. Existing approved sections stay in place.

Footer direction: adapt the shared-canvas energy of the Miro reference
91d18a5624ec719520282d1ef6a7af8d.jpg. A full-width cream workspace has a compact
identity bar, central collaboration invitation, floating cursor-shaped social
links, Victor's real photos, and a small generated yellow 3D waving hand.
No sticky-note/paper treatment or fictional collaborators. Mouse movement adds
a decorative visitor cursor; reduced motion and touch suppress it. Content stays
server rendered with a small FooterCanvas client wrapper. All labels, destinations,
photo paths and artwork are in homeContent.footer. Preserve Icons8 attribution,
copyright and the VS Code edition link. Footer wave source and prompt are in
public/images/footer/SOURCES.md; optimized wave.webp preserves alpha.

Footer refinement: a dense cocoa-brown pile of authentic technology logos now
fills the bottom of the footer. The upper silhouette is a U: tall at the outer
banks and low in the center. Reuse local brand SVG masks in a uniform brown;
never generate substitute logos. There are 268 instances on desktop and 92 on
phones. The footerPile content module derives its library from the existing
knowledge graph and hero stacks. Pointer proximity repels the logos; low gravity,
elastic layer supports, and collision impulses let them fall, bounce, and settle.
Motion sleeps after settling and pauses offscreen, on hidden tabs, for reduced
motion, or with the visible pause control. Copyright, location, Icons8 credit,
and the VS Code link sit on a clear strip below the pile. Keep the existing
shared-workspace footer composition above it.

Footer now ends directly with the logo pile, flush with the bottom edge. Victor requested removing the full copyright/location/credit/VS Code strip beneath it. The existing hero already contains the visible Icons8 attribution, so no replacement strip is needed.

Projects now use an exhibition-style gallery: a large split spotlight followed
by paired showcases, repeating that rhythm through the collection. Real project
screenshots are layered with a zoomed crop on wide entries, warm palette-backed
stages and large typographic project names. No paper artwork or invented results.
Project copy and destinations remain in src/content/projects.ts, interface copy
in homeContent.projects. Native expandable notes show the full overview and stack.
A small ProjectCollection client wrapper supplies category filters, counts and
show-all/show-selected controls for all 11 projects; the cards are server rendered.
All original live and repository destinations are preserved. Respect reduced
motion and keep the screenshot aspect ratio intact in the main preview.

Project detail pages now live at src/app/projects/[slug]/page.tsx, separate from
legacy. Cards open the local project story; live-site and repository links remain
explicit external actions. Each story uses the portfolio fonts/palette, a large
cover, native section anchors, factual overview/highlights, an image gallery,
full stack, and next-project navigation. The page is server rendered and all11
known routes are statically generated with canonical/OG/Twitter metadata,
CreativeWork/Breadcrumb JSON-LD, sitemap and llms.txt links. Unknown slugs use404.
The shared header's homePath prop makes navigation return to homepage anchors.

Project supports optional story paragraphs, highlights, gallery images/captions/
detail crops, and additional facts. Seed story fields live in
src/content/project-details.ts and are merged by the content adapter; the future
MongoDB/Cloudinary source can provide those same fields. No admin/database/upload
system was implemented in this pass. No timelines, roles or results were invented.
The initial Medark and Time Wise gallery detail crops are explicitly captioned
as details of the existing screenshot, not additional product screens. The sole
new interactive island is ProjectGallery, with native dialog focus trapping,
Escape, previous/next image controls, and focus restoration. Root content and
metadata stay server rendered. Homepage Icons8 credit is preserved.

Correction on project detail scope (2026-10-18): Victor requires substantial
technical case studies following the supplied Rentium content hierarchy, not
just overview/highlights/gallery pages. The structure includes client, role,
services, live product, four metrics, Challenge, Solution, Key Outcomes and a
technical architecture section with execution pipeline, database integrity,
concurrency, security, tests/CI/CD and implementation/access notes. Gallery and
stack remain supporting sections. Rich case-study fields are in
src/content/project-case-studies.ts; the Project type includes caseStudy.
Victor explicitly authorized dummy content. All current illustrative fields and
metrics are marked as demo placeholders until verified content replaces them.
The exact supplied Rentium example is a separate /projects/rentium layout demo,
not an entry in Victor's work collection; it is noindex and not in the sitemap.
Project cards now have a prominent View case study internal link. Visit website
is a distinct external link. Keep that distinction obvious.
