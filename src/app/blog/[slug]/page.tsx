import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CtaBand } from "@/components/cta-band";
import { Chip, JsonLd } from "@/components/ui";
import { absoluteUrl } from "@/content/site";
import { formatDate, getAllPosts, getPost } from "@/lib/blog";
import { breadcrumbJsonLd, organizationId, pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export async function generateStaticParams() {
  return (await getAllPosts()).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPost((await params).slug);
  if (!post) return {};
  return pageMetadata({
    title: post.meta.title,
    description: post.meta.description,
    path: `/blog/${post.slug}`,
    type: "article",
    publishedTime: post.meta.date,
  });
}

export default async function PostPage({ params }: Props) {
  const post = await getPost((await params).slug);
  if (!post) notFound();
  const { meta, Content } = post;

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Blog", path: "/blog" },
            { name: meta.title, path: `/blog/${post.slug}` },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: meta.title,
            description: meta.description,
            datePublished: meta.date,
            dateModified: meta.date,
            url: absoluteUrl(`/blog/${post.slug}`),
            mainEntityOfPage: absoluteUrl(`/blog/${post.slug}`),
            image: absoluteUrl(`/blog/${post.slug}/opengraph-image`),
            author: { "@type": "Person", name: meta.author },
            publisher: { "@id": organizationId },
            keywords: meta.tags?.join(", "),
          },
        ]}
      />
      <article className="container-site pt-10 pb-16 md:pt-16 md:pb-24">
        <header className="max-w-[760px]">
          <nav aria-label="Breadcrumb" className="text-[13px] text-ink-muted">
            <Link href="/blog" className="hover:text-link">
              blog
            </Link>{" "}
            / <time dateTime={meta.date}>{formatDate(meta.date)}</time> · {post.readingMinutes} min read
          </nav>
          <h1 className="type-h1 mt-4 text-ink">{meta.title}</h1>
          <p className="type-body-lg mt-4 text-ink-muted">{meta.description}</p>
          <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-line pt-5">
            <span className="text-[15px] text-ink">{meta.author}</span>
            {meta.tags?.map((t) => (
              <Chip key={t}>{t}</Chip>
            ))}
          </div>
        </header>
        <div className="prose mt-10">
          <Content />
        </div>
      </article>
      <CtaBand />
    </>
  );
}
