// src/app/api/audit/route.ts
export const runtime = "nodejs";

import { Resend } from "resend";

// If you're on Next.js 15, Response.json is available globally.
// If you prefer, you can instead: import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    // read the payload your form sends (adjust to your actual schema)
    const body = await req.json(); // e.g., { email, to, subject, html }
    const submittedEmail: string | undefined = typeof body?.email === "string" ? body.email : undefined;
    const to = process.env.CONTACT_TO_EMAIL || body.to;
    const subject = body.subject || (submittedEmail ? `Audit request: ${submittedEmail}` : "Audit request");
    const html = body.html || `
      <div style="font-family:system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, Helvetica, Arial; line-height:1.6;">
        <h2 style="margin:0 0 8px;">New audit request</h2>
        <p><strong>Email:</strong> ${submittedEmail ? escapeHtml(submittedEmail) : "(not provided)"}</p>
      </div>
    `;

    const normalizeAddress = (input?: string) => {
      if (!input) return input;
      const v = input.trim();
      if (v.startsWith("<") && v.endsWith(">")) return v.slice(1, -1);
      return v;
    };

    const from = normalizeAddress(process.env.MAIL_FROM || "Ordera <no-reply@orderaconsulting.com>");
    const toNormalized = normalizeAddress(to);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const fromRegex = /^(?:[^<>]+\s<[^<>@]+@[^<>@]+\.[^<>@]+>|[^<>@\s]+@[^<>@\s]+\.[^<>@\s]+)$/;

    // Create Resend client lazily at request time to avoid build-time env errors
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error("Missing RESEND_API_KEY");
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

    // NOTE: resend.emails.send returns { data, error }
    const { data, error } = await resend.emails.send({
      from,
      to: toNormalized,
      subject,
      html,
      replyTo: submittedEmail ? [submittedEmail] : undefined,
    });

    if (error) {
      console.error("Resend error:", error);
      return Response.json(
        { error: error.message ?? "Email send failed" },
        { status: 500 }
      );
    }

    // ✅ Correct: id is on data?.id (not result.id)
    return Response.json({ id: data?.id ?? null }, { status: 200 });
  } catch (err: unknown) {
    console.error("Route error:", err);
    const message = err instanceof Error ? err.message : "Unexpected error";
    return Response.json({ error: message }, { status: 500 });
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
