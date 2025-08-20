export const runtime = "nodejs";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

type NewsletterPayload = {
  email?: string;
};

export async function POST(request: Request) {
  const data = (await request.json().catch(() => ({}))) as NewsletterPayload;

  const to = process.env.CONTACT_TO_EMAIL!;
  const from = process.env.MAIL_FROM!;
  const subject = `Newsletter signup: ${data.email || "Unknown email"}`;
  const html = `
    <div style=\"font-family:system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, Helvetica, Arial, Apple Color Emoji, Segoe UI Emoji; line-height:1.6;\">
      <h2 style=\"margin:0 0 8px;\">Ordera Brief subscription</h2>
      <p><strong>Email:</strong> ${escapeHtml(data.email || "")}</p>
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


