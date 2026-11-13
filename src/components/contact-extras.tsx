"use client";

import { Check, Copy } from "lucide-react";
import { useEffect, useState } from "react";

/* Copies the email address, with a short "Copied" confirmation. */
export function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text);
          setCopied(true);
          setTimeout(() => setCopied(false), 1800);
        } catch {
          /* clipboard blocked: the address is still visible and selectable */
        }
      }}
      className="inline-flex h-10 flex-none items-center gap-2 rounded-full border border-ink/12 px-4 text-[14px] text-ink transition-colors hover:border-ink/40"
    >
      {copied ? <Check size={15} strokeWidth={2} aria-hidden="true" /> : <Copy size={15} strokeWidth={1.75} aria-hidden="true" />}
      <span aria-live="polite">{copied ? "Copied" : "Copy"}</span>
    </button>
  );
}

/* Studio's local time, updated every 30s. Rendered after mount to avoid a hydration mismatch. */
export function LocalTime({ timeZone }: { timeZone: string }) {
  const [now, setNow] = useState<string | null>(null);
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", hour12: false, timeZone });
    const tick = () => setNow(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, [timeZone]);
  if (!now) return null;
  return (
    <span className="text-[14px] text-ink-muted">
      <span className="font-medium text-ink tabular-nums">{now}</span> local time
    </span>
  );
}
