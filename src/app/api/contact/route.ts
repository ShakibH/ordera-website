export const runtime = "nodejs";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

type ContactPayload = {
  name?: string;
  email?: string;
  message?: string;
};

export async function POST(request: Request) {
  const data = (await request.json().catch(() => ({}))) as ContactPayload;

  const to = process.env.CONTACT_TO_EMAIL!;
  const from = process.env.MAIL_FROM!;
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

  const { data: sentData, error } = await resend.emails.send({ from, to, subject, html });
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




