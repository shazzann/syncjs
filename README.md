# SyncJS website

Marketing site for SyncJS, built on the SyncJS design system v2.1 (light theme, Geist + Geist Mono, deep teal).

**Stack:** Next.js 16 (App Router, fully static) · React 19 · TypeScript · Tailwind CSS 4 · MDX blog · Resend for the contact form. Deploys to Vercel with zero config.

## Run it

```bash
npm install
cp .env.example .env.local   # fill in values
npm run dev                  # http://localhost:3000
npm run build && npm start   # production check
```

## Edit content (no CMS needed)

| What | File |
| --- | --- |
| Company name, email, location, social links, domain | `src/content/site.ts` |
| Case studies (cards + `/work/[slug]` pages) | `src/content/work.ts` |
| Founders (about page) | `src/content/team.ts` |
| Clients (home page carousel, about page) | `src/content/partners.ts` |
| Services (home page section) | `src/content/services.ts` |
| Testimonials (home page carousel) | `src/content/testimonials.ts` |
| Blog posts | `src/content/blog/*.mdx` (one file per post, `export const metadata` at the top) |

Images: case-study screenshots in `public/work/<slug>/`, founder photos in `public/team/`, partner logos (single-colour SVG) in `public/partners/`. Set the path on the matching content entry. Without an image, a neutral placeholder frame or initials is shown.

New blog post: copy an existing `.mdx` file, change the file name (it becomes the URL) and the `metadata`. It appears on `/blog`, in the sitemap and gets its own social image automatically. Add `draft: true` to hide it.

## Before launch

Everything marked `PLACEHOLDER` in `src/content/` must be replaced. The design system bans invented numbers, so:

- [ ] Real case studies with real outcomes (`work.ts`), plus screenshots
- [ ] Studio stats under the work section (`studioStats` in `work.ts`)
- [ ] Founder names, roles, bios, photos and links (`team.ts`)
- [ ] Real client / partner names, with permission (`partners.ts`)
- [ ] Real testimonials with names, with written permission (`testimonials.ts`)
- [ ] Domain, email, location, founding year, social links (`site.ts`)
- [ ] Hero product image: `HeroDashboard` in `src/components/product-frame.tsx` is a coded mock-up; swap for a real screenshot if you have one
- [ ] Logo: `brand/syncjs-logo.jpg` is converted to transparent PNGs by `npm run brand:assets`. Get an SVG trace for sharper rendering and print
- [ ] Resend: verify your domain at resend.com, then set `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL` in Vercel
- [ ] Set `NEXT_PUBLIC_SITE_URL` to the production domain (canonical URLs, sitemap, social cards depend on it)
- [ ] Submit `https://<domain>/sitemap.xml` in Google Search Console

## SEO built in

- Per-page titles, descriptions and canonical URLs (`src/lib/seo.ts`)
- Generated Open Graph / Twitter images for the site, each case study and each post (`opengraph-image.tsx`)
- JSON-LD: Organization (ProfessionalService), WebSite, BreadcrumbList, CreativeWork for case studies, BlogPosting, AboutPage with founders as Person
- `sitemap.xml`, `robots.txt`, web manifest, favicons
- Every page is statically generated: fast first load, fully crawlable HTML
- One `h1` per page, semantic landmarks, skip link, visible focus rings, reduced-motion support

## Design system rules the code follows

**Creative direction: premium editorial minimal.** Light theme, large Geist headlines, a strict 12-column grid where every section has a small label on the left and content on the right, hairline dividers and almost no decoration. Copy is kept to one line per item. Motion is quiet: content fades up once as it scrolls in, project images ease on hover.

Shape rule: buttons are pills, images 14px, inputs 12px.

**Adding projects.** Put each project in its own folder under `projects/` (cover image, extra screenshots, an `info.md` from `projects/_template/`); see `projects/README.md`. Claude turns each folder into an entry in `src/content/work.ts` and copies the images to `public/work/<slug>/`. On the site, `cover.*` is the main image, other images form the case-study gallery, and `link` adds a "Visit" button. Projects with only images and no link work fine.

Tokens live in `src/app/globals.css` (`@theme`) and are used by name (`bg-canvas`, `text-ink-muted`, `text-link`). The three signatures: the sync-line section label (`SectionLabel`), mono stats (`Stat`), and one highlight per screen (`Mark`). One primary button per view; one deep-teal band per page (the contact band). Borders, not shadows. No pill buttons, gradients or stock imagery.
