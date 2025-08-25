export const runtime = "nodejs";

import { Resend } from "resend";

type ContactPayload = {
  name?: string;
  email?: string;
  message?: string;
};

export async function POST(request: Request) {
  const data = (await request.json().catch(() => ({}))) as ContactPayload;

  const normalizeAddress = (input?: string) => {
    if (!input) return input;
    const v = input.trim();
    if (v.startsWith("<") && v.endsWith(">")) return v.slice(1, -1);
    return v;
  };

  const to = process.env.CONTACT_TO_EMAIL;
  const from = normalizeAddress(process.env.MAIL_FROM);
  const toNormalized = normalizeAddress(to);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const fromRegex = /^(?:[^<>]+\s<[^<>@]+@[^<>@]+\.[^<>@]+>|[^<>@\s]+@[^<>@\s]+\.[^<>@\s]+)$/;
  const subject = `New Contact Inquiry from ${data.name || "Unknown"}`;
  const html = `
    <div style="font-family:system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, Helvetica, Arial, Apple Color Emoji, Segoe UI Emoji; line-height:1.6;">
      <h2 style="margin:0 0 8px;">New contact form submission</h2>
      <p style="margin:0 0 8px;"><strong>Name:</strong> ${escapeHtml(data.name || "")}</p>
      <p style="margin:0 0 8px;"><strong>Email:</strong> ${escapeHtml(data.email || "")}</p>
      <p style="margin:12px 0 0;"><strong>Message</strong></p>
      <pre style="white-space:pre-wrap; padding:12px; background:#f6f6f7; border-radius:8px;">${escapeHtml(data.message || "")}</pre>
    </div>
  `;

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return Response.json({ error: "Email service misconfigured (missing RESEND_API_KEY)" }, { status: 500 });
  }
  if (!from) {
    return Response.json({ error: "Email service misconfigured (missing MAIL_FROM)" }, { status: 500 });
  }
  if (!toNormalized) {
    return Response.json({ error: "Email service misconfigured (missing CONTACT_TO_EMAIL)" }, { status: 500 });
  }
  if (!fromRegex.test(from)) {
    return Response.json({ error: "Invalid 'from' format. Use 'name <email@domain>' or 'email@domain'." }, { status: 422 });
  }
  if (!emailRegex.test(toNormalized)) {
    return Response.json({ error: "Invalid 'to' email format." }, { status: 422 });
  }
  const resend = new Resend(apiKey);
  const { data: sentData, error } = await resend.emails.send({ from, to: toNormalized, subject, html, replyTo: data.email ? [data.email] : undefined });
  if (error) {
    return Response.json({ error: error.message ?? "Email send failed" }, { status: 500 });
  }
  return Response.json({ id: sentData?.id ?? null });
}

function escapeHtml(input: string): string {
  return input
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}




