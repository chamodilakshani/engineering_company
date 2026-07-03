import { NextRequest, NextResponse } from "next/server";
import { checkAdminPassword, createAdminToken, getAdminCookieHeader } from "@/lib/adminAuth";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const password = body?.password;

  if (!password || !checkAdminPassword(password)) {
    return NextResponse.json({ ok: false, error: "Invalid password." }, { status: 401 });
  }

  const token = createAdminToken();
  const res = NextResponse.json({ ok: true });
  res.headers.append("Set-Cookie", getAdminCookieHeader(token));
  return res;
}
