"use server";

import { headers } from "next/headers";
import { Resend } from "resend";
import { z } from "zod";

const schema = z.object({
  name: z.string().trim().min(2, "Enter your name, so we know who to reply to.").max(120),
  email: z.email("Enter an email address like name@company.com.").max(200),
  company: z.string().trim().max(160).optional(),
  message: z
    .string()
    .trim()
    .min(20, "Tell us a little more: what you want to build and by when (20 characters or more).")
    .max(5000, "Keep it under 5,000 characters. We'll ask follow-up questions on the call."),
});

export type ContactState = {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: Partial<Record<"name" | "email" | "company" | "message", string>>;
  values?: Partial<Record<"name" | "email" | "company" | "message", string>>;
};

// Very small in-memory rate limit per IP (resets on cold start; fine for a brochure site).
const hits = new Map<string, number[]>();
function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 10 * 60_000);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > 5;
}

const escape = (s: string) => s.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);

export async function sendContact(_prev: ContactState, form: FormData): Promise<ContactState> {
  const raw = {
    name: String(form.get("name") ?? ""),
    email: String(form.get("email") ?? ""),
    company: String(form.get("company") ?? "") || undefined,
    message: String(form.get("message") ?? ""),
  };

  // Honeypot: real people never fill this hidden field.
  if (String(form.get("website") ?? "").length > 0) return { status: "success" };

  const parsed = schema.safeParse(raw);
  if (!parsed.success) {
    const errors: ContactState["errors"] = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as keyof NonNullable<ContactState["errors"]>;
      errors[key] ??= issue.message;
    }
    return { status: "error", errors, values: { ...raw, company: raw.company ?? "" }, message: "Check the highlighted fields." };
  }

  const h = await headers();
  const ip = h.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (limited(ip)) {
    return { status: "error", values: raw, message: "Too many messages from this connection. Email us directly instead." };
  }

  const { name, email, company, message } = parsed.data;
  // Optional "What are you building?" choices: short strings only, at most 8.
  const interests = form
    .getAll("interest")
    .map((v) => String(v).trim().slice(0, 60))
    .filter(Boolean)
    .slice(0, 8);
  const building = interests.length ? interests.join(", ") : "-";
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !to || !from) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[contact] Resend not configured; enquiry logged instead:", { ...parsed.data, interests });
      return { status: "success" };
    }
    console.error("[contact] RESEND_API_KEY, CONTACT_TO_EMAIL or CONTACT_FROM_EMAIL is missing.");
    return { status: "error", values: raw, message: "The form isn't working right now. Email us directly instead." };
  }

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from,
    to,
    replyTo: email,
    subject: `New enquiry from ${name}${company ? ` (${company})` : ""}${interests.length ? `: ${building}` : ""}`,
    text: `Name: ${name}\nEmail: ${email}\nCompany: ${company ?? "-"}\nBuilding: ${building}\n\n${message}`,
    html: `<p><strong>Name:</strong> ${escape(name)}<br><strong>Email:</strong> ${escape(email)}<br><strong>Company:</strong> ${escape(company ?? "-")}<br><strong>Building:</strong> ${escape(building)}</p><p style="white-space:pre-wrap">${escape(message)}</p>`,
  });

  if (error) {
    console.error("[contact] Resend error", error);
    return { status: "error", values: raw, message: "We couldn't send that. Try again, or email us directly." };
  }
  return { status: "success" };
}
