import Link from "next/link";
import { JsonLd, PageHeader } from "@/components/ui";
import { absoluteUrl, site } from "@/content/site";
import { formatDate, getAllPosts } from "@/lib/blog";
import { breadcrumbJsonLd, organizationId, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Blog",
  description: "Notes from SyncJS on scoping, building and running web software for growing businesses.",
  path: "/blog",
});

export default async function BlogPage() {
  const posts = await getAllPosts();
  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Blog", path: "/blog" },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "Blog",
            name: `${site.name} blog`,
            url: absoluteUrl("/blog"),
            publisher: { "@id": organizationId },
          },
        ]}
      />
      <PageHeader label="Blog" title="Notes on building software" lead="How we scope, build and run projects. Short, practical, written by the people doing the work." />

      <section aria-label="Posts" className="container-site pb-16 md:pb-24">
        {posts.length === 0 ? (
          <p className="type-body text-ink-muted">No posts yet.</p>
        ) : (
          <ul className="border-t border-line">
            {posts.map((p) => (
              <li key={p.slug} className="border-b border-line">
                <Link href={`/blog/${p.slug}`} className="group grid gap-2 py-6 md:grid-cols-12 md:gap-6 md:py-8">
                  <p className="text-[13px] pt-1.5 text-ink-muted md:col-span-3">
                    <time dateTime={p.meta.date}>{formatDate(p.meta.date)}</time> · {p.readingMinutes} min
                  </p>
                  <div className="md:col-span-7">
                    <h2 className="type-h3 text-ink group-hover:text-link">{p.meta.title}</h2>
                    <p className="type-body mt-1.5 text-ink-muted">{p.meta.description}</p>
                  </div>
                  <p className="text-[13px] hidden pt-1.5 text-right text-link md:col-span-2 md:block">read →</p>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  );
}
