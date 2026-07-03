import { NextResponse } from "next/server";
import { clearAdminCookieHeader } from "@/lib/adminAuth";

export async function POST() {
  const res = NextResponse.json({ ok: true });
  res.headers.append("Set-Cookie", clearAdminCookieHeader());
  return res;
}
