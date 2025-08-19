import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const data = await request.json().catch(() => ({}));
  // In production, forward to CRM or email. For now, just echo.
  return NextResponse.json({ ok: true, received: data });
}




