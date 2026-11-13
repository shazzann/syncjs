import { formatDate, getAllPosts, getPost } from "@/lib/blog";
import { renderOg, ogSize } from "@/lib/og";

export const alt = "SyncJS blog post";
export const size = ogSize;
export const contentType = "image/png";

export async function generateStaticParams() {
  return (await getAllPosts()).map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const post = await getPost((await params).slug);
  return renderOg({
    label: `blog / ${post ? formatDate(post.meta.date) : ""}`,
    title: post?.meta.title ?? "SyncJS blog",
    footer: post ? `${post.readingMinutes} min read` : undefined,
  });
}
