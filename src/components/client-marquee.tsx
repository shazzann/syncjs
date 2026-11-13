import Image from "next/image";
import type { Partner } from "@/content/partners";
import { partners } from "@/content/partners";

function Logo({ p }: { p: Partner }) {
  const mark = p.logo ? (
    <Image src={p.logo} alt={p.name} width={240} height={96} className="h-9 w-auto max-w-[180px] object-contain opacity-55 grayscale transition-[opacity,filter] duration-300 hover:opacity-100 hover:grayscale-0 md:h-11" />
  ) : (
    <span className="text-[20px] font-medium tracking-[-0.02em] whitespace-nowrap text-ink/35 md:text-[22px]">{p.name}</span>
  );
  return p.href ? (
    <a href={p.href} target="_blank" rel="noopener noreferrer" aria-label={`${p.name} website`} className="inline-flex">
      {mark}
    </a>
  ) : (
    mark
  );
}

/* Client logos as an endless carousel. With only a few logos the list is repeated so the
   strip is always full; the whole set is rendered twice for a seamless loop, and the
   repeats are hidden from screen readers. Pauses on hover; stops for reduced motion. */
export function ClientMarquee({ contained = true }: { contained?: boolean }) {
  const reps = Math.max(1, Math.ceil(8 / partners.length));
  const row = Array.from({ length: reps }, (_, r) => partners.map((p) => ({ p, key: `${r}-${p.name}`, repeat: r > 0 }))).flat();
  return (
    <div className={`marquee-wrap overflow-hidden ${contained ? "" : "-mx-4 sm:mx-0"}`}>
      <div className="marquee">
        {[0, 1].map((copy) => (
          <ul key={copy} aria-hidden={copy === 1 || undefined} className="flex flex-none items-center">
            {row.map(({ p, key, repeat }) => (
              <li key={key} aria-hidden={(copy === 0 && repeat) || undefined} className="flex h-20 flex-none items-center px-10 md:px-14">
                <Logo p={p} />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
