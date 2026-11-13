import fs from "node:fs";
import path from "node:path";
import type { CaseStudy, ProjectImage } from "@/content/work";

const ROOT = path.join(process.cwd(), "public/work");
const IMG = /\.(webp|jpe?g|png|avif)$/i;

type Manifest = { cover?: ProjectImage; gallery?: ProjectImage[] };

/* Fills a project's cover and gallery from public/work/<slug>/.
   Prefers manifest.json (written by `npm run projects:import`, includes image sizes);
   otherwise uses cover.* as the cover and the other images, in filename order, as the gallery. */
export function withProjectImage(work: CaseStudy): CaseStudy {
  const dir = path.join(ROOT, work.slug);
  const alt = (n: number) => `${work.title}, image ${n}`;
  let image = work.image;
  let gallery = work.gallery;

  const manifestPath = path.join(dir, "manifest.json");
  if (fs.existsSync(manifestPath)) {
    const m = JSON.parse(fs.readFileSync(manifestPath, "utf8")) as Manifest;
    if (!image && m.cover) image = { ...m.cover, alt: `${work.title}, cover image` };
    if (!gallery && m.gallery) gallery = m.gallery.map((g, i) => ({ ...g, alt: alt(i + 1) }));
  } else if (fs.existsSync(dir) && fs.statSync(dir).isDirectory()) {
    const files = fs.readdirSync(dir).filter((f) => IMG.test(f)).sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
    const cover = files.find((f) => /^cover[.-]/i.test(f)) ?? files[0];
    if (!image && cover) image = { src: `/work/${work.slug}/${cover}`, alt: `${work.title}, cover image` };
    if (!gallery) gallery = files.filter((f) => f !== cover).map((f, i) => ({ src: `/work/${work.slug}/${f}`, alt: alt(i + 1) }));
  }
  return { ...work, image, gallery: gallery?.length ? gallery : undefined };
}

export const withProjectImages = (list: CaseStudy[]) => list.map(withProjectImage);
