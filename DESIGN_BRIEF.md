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

## Current stage

The homepage hero now uses the supplied compact grid reference as a structural
starting point, with minimal outer padding and a tall portrait panel on the left.
The palette and typography remain the established portfolio foundation.

The portrait uses Victor's supplied photo as its identity reference: a subtly
animated editorial likeness wearing a red Arsenal jersey, embracing a MacBook,
with irregularly scattered dimensional technology emblems. The original PNG has
real transparency and lives in `public/images/hero/` alongside its generation
prompt. Supporting grid panels introduce Victor, show his stack, feature real
work, and provide contact actions. The existing sections continue below the hero;
the legacy experience remains at `/vscode`.
