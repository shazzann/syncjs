import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/content/site";
import { caseStudies } from "@/content/work";
import { getAllPosts } from "@/lib/blog";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const posts = await getAllPosts();

  const pages: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/"), lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: absoluteUrl("/work"), lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: absoluteUrl("/about"), lastModified: now, changeFrequency: "yearly", priority: 0.7 },
    { url: absoluteUrl("/blog"), lastModified: posts[0] ? new Date(posts[0].meta.date) : now, changeFrequency: "weekly", priority: 0.7 },
    { url: absoluteUrl("/contact"), lastModified: now, changeFrequency: "yearly", priority: 0.8 },
  ];

  return [
    ...pages,
    ...caseStudies.map((c) => ({
      url: absoluteUrl(`/work/${c.slug}`),
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.8,
    })),
    ...posts.map((p) => ({
      url: absoluteUrl(`/blog/${p.slug}`),
      lastModified: new Date(p.meta.date),
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}
