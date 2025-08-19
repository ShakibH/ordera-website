import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const data = await request.json().catch(() => ({}));
  // TODO: integrate with email service or CRM
  return NextResponse.json({ ok: true, received: data });
}




