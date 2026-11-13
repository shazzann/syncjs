import Image from "next/image";
import Link from "next/link";
import mark from "../../public/brand/syncjs-mark.png";

/* Mark + wordmark lockup for the nav and footer. "JS" in mono, link colour. */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" aria-label="SyncJS home" className={`inline-flex items-center gap-2.5 rounded-sm ${className}`}>
      <Image src={mark} alt="" width={28} height={28} priority className="size-7" />
      <span className="text-[19px] leading-none font-medium tracking-[-0.02em] text-ink">
        Sync<span className="font-mono text-link">JS</span>
      </span>
    </Link>
  );
}
