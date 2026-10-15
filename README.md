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

## Environment variables

See `.env.example`. On Vercel, set `EMAIL_USER`, `EMAIL_PASS` (a Gmail App Password),
optionally `CONTACT_TO_EMAIL`, and `NEXT_PUBLIC_SITE_URL` if you move to a custom domain.

## SEO and AI engine optimization

- Metadata, canonical URLs, Open Graph and X cards in `src/app/layout.tsx`
- JSON-LD graph (Person, WebSite, ProfilePage, project ItemList) in `src/lib/structured-data.ts`
- `robots.txt` explicitly allows search engines and AI crawlers (GPTBot, OAI-SearchBot, ClaudeBot,
  PerplexityBot, Google-Extended and others)
- `/llms.txt` and `/llms-full.txt` give AI assistants a clean, factual summary to cite
