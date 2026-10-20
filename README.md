# Victor Onyemaechi – Portfolio

Personal portfolio built with Next.js (App Router), React, TypeScript and Tailwind CSS.

## Getting started

```bash
npm install
cp .env.example .env.local   # then fill in the values
npm run dev                  # http://localhost:3000
```

Other scripts: `npm run build`, `npm start`, `npm run lint`, `npm run typecheck`.

## Project structure

```
src/
  app/                  Routes, metadata and SEO files (Next.js App Router)
    api/contact/        Contact form endpoint (sends email with Nodemailer)
    llms.txt/           /llms.txt for AI assistants (generated from src/content)
    llms-full.txt/      /llms-full.txt, the whole portfolio as plain text
    vscode/             /vscode, the original VS Code edition
    opengraph-image.tsx Social share image, generated at build time
    robots.ts, sitemap.ts, manifest.ts
  content/              All portfolio content (profile, projects, skills, education, services, FAQs)
  components/           Shared components for the new UI
  legacy/vscode/        The original VS Code + client portfolio, kept as-is
  lib/                  Helpers (structured data, llms.txt builders, contact client, cn)
public/
  images/               Profile photos and logo
  projects/             Project screenshots
  icons/                Favicons and app icons
```

**To update content, edit the files in `src/content/`.** The sitemap, structured data,
`llms.txt` and the VS Code projects/gallery all read from there. Bump `lastUpdated` in
`src/content/site.ts` when you make changes.

The fresh homepage uses `src/components/home/` and `src/components/layout/`.
Homepage copy is in `src/content/home.ts`; the server data adapter is
`src/lib/portfolio-content.ts`, ready to replace with an admin/database source.
Keep `src/legacy/` unchanged; its entry point is `/vscode`.

The portrait cutout and floating brand marks are separate assets. Logo drift and
pointer proximity live in the small `portrait-scene.tsx` client component, which
respects reduced motion and pauses offscreen. Fonts are self-hosted under
`src/app/fonts/`, with their licenses. Asset source notes live alongside the
brand logos and Icons8 icons.

The hero's eight-card grid includes a photo slideshow beside the headline.
Its photos, captions, timing, and control labels are editable in `src/content/home.ts`.
`hero-slideshow.tsx` is a small client island; the surrounding hero remains server-rendered.
Hero layout rules live in `src/app/hero.css`.

## Environment variables

See `.env.example`. On Vercel, set `EMAIL_USER`, `EMAIL_PASS` (a Gmail App Password),
optionally `CONTACT_TO_EMAIL`, and `NEXT_PUBLIC_SITE_URL` if you move to a custom domain.

## SEO and AI engine optimization

- Metadata, canonical URLs, Open Graph and X cards in `src/app/layout.tsx`
- JSON-LD graph (Person, WebSite, ProfilePage, project ItemList) in `src/lib/structured-data.ts`
- `robots.txt` explicitly allows search engines and AI crawlers (GPTBot, OAI-SearchBot, ClaudeBot,
  PerplexityBot, Google-Extended and others)
- `/llms.txt` and `/llms-full.txt` give AI assistants a clean, factual summary to cite

## Admin, blog and visitor analytics

The admin lives at `/admin`. It is a single-owner login using `ADMIN_EMAIL` and `ADMIN_PASSWORD` (or `ADMIN_PASSWORD_HASH`, made with `npm run admin:hash -- "your password"`) plus `ADMIN_SESSION_SECRET`.

- **Database:** MongoDB. Locally, `npm run db:up` starts it in Docker (`docker-compose.yml`) and `MONGODB_URI=mongodb://localhost:27017/portfolio`. In production, use a hosted MongoDB (e.g. Atlas) URI.
- **Content:** `src/content` holds the defaults. When a section or project is saved in admin, the database copy wins. "Restore original" on a section returns it to the file version. Projects are copied into the database the first time one is edited.
- **Images and CV:** uploaded from admin straight to Cloudinary (`CLOUDINARY_*` env). `/cv` always serves the current CV and counts downloads.
- **Blog:** posts are written in Markdown at `/admin/blog` and published at `/blog`. They include BlogPosting JSON-LD, Open Graph tags, an RSS feed at `/blog/rss.xml`, and entries in the sitemap and llms.txt.
- **Analytics:** `src/components/analytics/visit-tracker.tsx` records page views, time on page, scroll depth and key clicks. Each visit's source comes from the referrer and UTM tags (ChatGPT, Claude, Perplexity, Gemini, Google, LinkedIn, X, GitHub, direct and more). `src/proxy.ts` logs crawlers such as GPTBot and ClaudeBot separately. IPs are only stored as a daily salted hash, and raw data expires after about 13 months. Country and city come from Vercel's geo headers, so they are only filled in once the site is deployed there.
