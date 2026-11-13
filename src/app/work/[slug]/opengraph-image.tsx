import { caseStudies, getCaseStudy } from "@/content/work";
import { renderOg, ogSize } from "@/lib/og";

export const alt = "SyncJS case study";
export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const work = getCaseStudy((await params).slug);
  const lead = work?.outcomes?.[0];
  return renderOg({
    label: `work / ${work?.sector ?? "case study"}`,
    title: work?.title ?? "Case study",
    footer: lead ? `${lead.value}${lead.unit ?? ""} ${lead.caption}` : undefined,
  });
}
