"use client";

import { ArrowUpRight } from "lucide-react";
import { useActionState, useEffect, useRef, useState } from "react";
import { sendContact, type ContactState } from "@/app/actions/contact";
import { cn } from "@/lib/utils";

const OPTIONS = ["E-commerce", "AI and WhatsApp automation", "Website", "Web or mobile app", "Support retainer"];
const MAX = 5000;

const field =
  "w-full rounded-2xl border bg-canvas px-5 text-[16px] text-ink transition-colors placeholder:text-ink-muted hover:border-ink/25 focus:border-focus focus:bg-surface focus:outline-2 focus:outline-offset-1 focus:outline-focus";

/* Project brief form: name and email, optional project-type chips, the brief with a
   character counter, and a round-arrow submit. Labels are visually hidden but present. */
export function BriefForm() {
  const [state, action, pending] = useActionState<ContactState, FormData>(sendContact, { status: "idle" });
  const [picked, setPicked] = useState<string[]>([]);
  const [count, setCount] = useState(state.values?.message?.length ?? 0);
  const done = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (state.status === "success") done.current?.focus();
  }, [state.status]);

  if (state.status === "success") {
    return (
      <div ref={done} tabIndex={-1} role="status" className="flex min-h-[420px] flex-col justify-center outline-none">
        <p className="text-[14px] text-link">Brief received</p>
        <p className="mt-3 text-[32px] leading-tight font-medium tracking-[-0.03em] text-ink">Thanks. We&apos;ll be in touch within one working day.</p>
        <p className="mt-3 text-[16px] text-ink-muted">Expect a few questions and a time for a 30-minute call.</p>
      </div>
    );
  }

  const e = state.errors ?? {};
  const v = state.values ?? {};
  const toggle = (o: string) => setPicked((p) => (p.includes(o) ? p.filter((x) => x !== o) : [...p, o]));

  return (
    <form action={action} noValidate className="space-y-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="bf-name" className="sr-only">
            Your name
          </label>
          <input
            id="bf-name"
            name="name"
            autoComplete="name"
            required
            placeholder="Your name"
            defaultValue={v.name}
            aria-invalid={e.name ? true : undefined}
            aria-describedby={e.name ? "bf-name-err" : undefined}
            className={cn(field, "h-16", e.name ? "border-danger" : "border-ink/10")}
          />
          {e.name && (
            <p id="bf-name-err" className="mt-2 text-[13px] text-danger">
              {e.name}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="bf-email" className="sr-only">
            Email address
          </label>
          <input
            id="bf-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder="Email address"
            defaultValue={v.email}
            aria-invalid={e.email ? true : undefined}
            aria-describedby={e.email ? "bf-email-err" : undefined}
            className={cn(field, "h-16", e.email ? "border-danger" : "border-ink/10")}
          />
          {e.email && (
            <p id="bf-email-err" className="mt-2 text-[13px] text-danger">
              {e.email}
            </p>
          )}
        </div>
      </div>

      <fieldset>
        <legend className="text-[16px] font-medium text-ink">
          What are you building? <span className="ml-1 text-[13px] font-normal tracking-wide text-ink-muted uppercase">Optional</span>
        </legend>
        <div className="mt-4 flex flex-wrap gap-2.5">
          {OPTIONS.map((o) => {
            const on = picked.includes(o);
            return (
              <label
                key={o}
                className={cn(
                  "inline-flex h-12 cursor-pointer items-center rounded-full border px-5 text-[15px] transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-focus",
                  on ? "border-ink bg-ink text-canvas" : "border-ink/12 text-ink hover:border-ink/40",
                )}
              >
                <input type="checkbox" name="interest" value={o} checked={on} onChange={() => toggle(o)} className="sr-only" />
                {o}
              </label>
            );
          })}
        </div>
      </fieldset>

      <div>
        <label htmlFor="bf-brief" className="sr-only">
          Your brief
        </label>
        <div className="relative">
          <textarea
            id="bf-brief"
            name="message"
            required
            rows={6}
            maxLength={MAX}
            placeholder="Your brief: what, for whom, and by when"
            defaultValue={v.message}
            onChange={(ev) => setCount(ev.target.value.length)}
            aria-invalid={e.message ? true : undefined}
            aria-describedby={e.message ? "bf-brief-err" : "bf-count"}
            className={cn(field, "min-h-[220px] resize-y py-5 leading-7", e.message ? "border-danger" : "border-ink/10")}
          />
          <span id="bf-count" className="pointer-events-none absolute right-5 bottom-4 text-[13px] text-ink-muted tabular-nums">
            {count.toLocaleString()} / {MAX.toLocaleString()}
          </span>
        </div>
        {e.message && (
          <p id="bf-brief-err" className="mt-2 text-[13px] text-danger">
            {e.message}
          </p>
        )}
      </div>

      {/* Honeypot */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Website <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="flex flex-col-reverse gap-5 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={pending}
          aria-busy={pending}
          className="group inline-flex h-16 items-center gap-4 self-start rounded-full bg-ink py-2 pr-2 pl-7 text-[17px] font-medium text-canvas transition-colors hover:bg-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus disabled:opacity-70"
        >
          {pending ? "Sending…" : "Send brief"}
          <span aria-hidden="true" className="flex size-12 items-center justify-center rounded-full bg-canvas text-ink transition-transform duration-300 group-hover:rotate-45">
            <ArrowUpRight size={20} strokeWidth={2} />
          </span>
        </button>
        <p role={state.status === "error" ? "alert" : undefined} className={cn("flex items-center gap-2.5 text-[14px]", state.status === "error" ? "text-danger" : "text-ink-muted")}>
          {state.status !== "error" && <span aria-hidden="true" className="size-2 rounded-full bg-signal" />}
          {state.status === "error" ? state.message : "Replies within one working day"}
        </p>
      </div>
    </form>
  );
}
