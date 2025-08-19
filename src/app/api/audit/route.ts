import { NextResponse } from "next/server";

export const runtime = "nodejs";

type AuditPayload = {
  email?: string;
};

export async function POST(request: Request) {
  const data = (await request.json().catch(() => ({}))) as AuditPayload;

  try {
    const toAddress = process.env.CONTACT_TO_EMAIL || "info@orderaconsulting.com";
    const subject = `Audit request: ${data.email || "Unknown email"}`;
    const html = `
      <div style="font-family:system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, Helvetica, Arial, Apple Color Emoji, Segoe UI Emoji; line-height:1.6;">
        <h2 style="margin:0 0 8px;">Free AI/automation audit signup</h2>
        <p><strong>Email:</strong> ${escapeHtml(data.email || "")}</p>
      </div>
    `;

    const sent = await sendEmail({ to: toAddress, subject, html });
    return NextResponse.json({ ok: true, sent });
  } catch (error) {
    console.error("/api/audit error", error);
    return NextResponse.json({ ok: false, error: "Failed to send" }, { status: 500 });
  }
}

function escapeHtml(input: string): string {
  return input
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

async function sendEmail({ to, subject, html }: { to: string; subject: string; html: string }) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("RESEND_API_KEY not set. Skipping actual send. Payload:", { to, subject });
    return { skipped: true };
  }
  const { Resend } = await import("resend");
  const resend = new Resend(apiKey);
  const from = process.env.MAIL_FROM || "Ordera <no-reply@orderaconsulting.com>";
  const result = await resend.emails.send({ from, to, subject, html });
  return { id: result.id };
}


