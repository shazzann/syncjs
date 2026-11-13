import fs from "node:fs/promises";
import path from "node:path";
import type { ComponentType } from "react";

/* Blog posts are MDX files in src/content/blog. Each exports `metadata`:
   export const metadata = { title, description, date: "2026-10-01", author, tags: [] } */

export type PostMeta = {
  title: string;
  description: string;
  date: string;
  author: string;
  tags?: string[];
  draft?: boolean;
};

export type Post = { slug: string; meta: PostMeta; Content: ComponentType; readingMinutes: number };

const DIR = path.join(process.cwd(), "src/content/blog");

export async function getPostSlugs() {
  const files = await fs.readdir(DIR);
  return files.filter((f) => f.endsWith(".mdx")).map((f) => f.replace(/\.mdx$/, ""));
}

export async function getPost(slug: string): Promise<Post | null> {
  try {
    const mod = await import(`@/content/blog/${slug}.mdx`);
    const source = await fs.readFile(path.join(DIR, `${slug}.mdx`), "utf8");
    const words = source.replace(/export const metadata[\s\S]*?\n};?\n/, "").split(/\s+/).length;
    return { slug, meta: mod.metadata as PostMeta, Content: mod.default, readingMinutes: Math.max(1, Math.round(words / 230)) };
  } catch {
    return null;
  }
}

export async function getAllPosts() {
  const posts = await Promise.all((await getPostSlugs()).map(getPost));
  return posts
    .filter((p): p is Post => !!p && !p.meta.draft)
    .sort((a, b) => b.meta.date.localeCompare(a.meta.date));
}

export function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" }).toLowerCase();
}
