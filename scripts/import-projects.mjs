// Imports project images from the projects/ inbox into public/work/<slug>/.
//
//   projects/<slug>/cover.png      -> public/work/<slug>/cover-<hash>.webp
//   projects/<slug>/<other images> -> public/work/<slug>/01-<hash>.webp, 02-... (filename order)
//   + public/work/<slug>/manifest.json with each image's size, read by src/lib/project-images.ts
//
// Images are converted to webp (max 2400px wide) as they are; nothing is cropped or composed.
// Run: npm run projects:import            (all projects)
//      npm run projects:import -- sambol  (one project)
import fs from "node:fs/promises";
import path from "node:path";
import { createHash } from "node:crypto";
import sharp from "sharp";

const INBOX = "projects";
const OUT = "public/work";
const IMG = /\.(png|jpe?g|webp|avif)$/i;
const MAX_W = 2400;

const only = process.argv.slice(2);
const slugs = (await fs.readdir(INBOX, { withFileTypes: true }))
  .filter((d) => d.isDirectory() && !d.name.startsWith("_"))
  .map((d) => d.name)
  .filter((s) => !only.length || only.includes(s));

/* Converts to webp and names the file <base>-<content hash>.webp, so a replaced image always
   gets a new URL and no browser or image cache can serve the old one. Returns the file name. */
async function toWebp(src, dir, base) {
  const img = sharp(src).rotate();
  const { width = 0 } = await img.metadata();
  const { data, info } = await img
    .resize({ width: Math.min(width, MAX_W), withoutEnlargement: true })
    .webp({ quality: 82 })
    .toBuffer({ resolveWithObject: true });
  const name = `${base}-${createHash("sha1").update(data).digest("hex").slice(0, 8)}.webp`;
  await fs.writeFile(path.join(dir, name), data);
  return { name, width: info.width, height: info.height };
}

for (const slug of slugs) {
  const dir = path.join(INBOX, slug);
  const files = (await fs.readdir(dir)).filter((f) => IMG.test(f)).sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
  if (!files.length) {
    console.log(`- ${slug}: no images, skipped`);
    continue;
  }
  const coverFile = files.find((f) => /^cover\./i.test(f)) ?? files[0];
  const rest = files.filter((f) => f !== coverFile);

  const out = path.join(OUT, slug);
  await fs.rm(out, { recursive: true, force: true });
  await fs.mkdir(out, { recursive: true });

  const c = await toWebp(path.join(dir, coverFile), out, "cover");

  const gallery = [];
  for (const [i, f] of rest.entries()) {
    const g = await toWebp(path.join(dir, f), out, String(i + 1).padStart(2, "0"));
    gallery.push({ src: `/work/${slug}/${g.name}`, width: g.width, height: g.height });
  }

  const manifest = { cover: { src: `/work/${slug}/${c.name}`, width: c.width, height: c.height }, gallery };
  await fs.writeFile(path.join(out, "manifest.json"), JSON.stringify(manifest, null, 2));
  console.log(`- ${slug}: ${c.name} ${c.width}x${c.height}, ${gallery.length} more image(s)`);
}
