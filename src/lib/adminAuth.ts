import { createHmac, timingSafeEqual } from "crypto";
import { headers } from "next/headers";

const COOKIE_NAME = "meeya_admin";
const COOKIE_MAX_AGE = 60 * 60 * 24; // 24 hours

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const ADMIN_SESSION_SECRET = process.env.ADMIN_SESSION_SECRET;

function encode(value: string) {
  return Buffer.from(value, "utf8").toString("base64url");
}

function decode(value: string) {
  return Buffer.from(value, "base64url").toString("utf8");
}

function createSignature(payload: string) {
  if (!ADMIN_SESSION_SECRET) {
    throw new Error("ADMIN_SESSION_SECRET is required.");
  }
  return createHmac("sha256", ADMIN_SESSION_SECRET).update(payload).digest("base64url");
}

export function checkAdminPassword(password: string) {
  return ADMIN_PASSWORD && password === ADMIN_PASSWORD;
}

export function createAdminToken() {
  if (!ADMIN_SESSION_SECRET) {
    throw new Error("ADMIN_SESSION_SECRET is required.");
  }

  const expires = Math.floor(Date.now() / 1000) + COOKIE_MAX_AGE;
  const payload = JSON.stringify({ expires });
  const signature = createSignature(payload);
  return `${encode(payload)}.${signature}`;
}

export function verifyAdminToken(token?: string | null) {
  if (!token || !ADMIN_SESSION_SECRET) return false;
  const [payloadPart, signaturePart] = token.split(".");
  if (!payloadPart || !signaturePart) return false;

  const payload = decode(payloadPart);
  const expected = createSignature(payload);

  try {
    if (!timingSafeEqual(Buffer.from(signaturePart), Buffer.from(expected))) {
      return false;
    }
  } catch {
    return false;
  }

  try {
    const data = JSON.parse(payload) as { expires: number };
    return Date.now() / 1000 < data.expires;
  } catch {
    return false;
  }
}

export function getAdminCookieToken() {
  const cookieHeader = headers().get("cookie") ?? "";
  const cookies = cookieHeader
    .split(";")
    .map((cookie) => cookie.trim())
    .filter(Boolean);
  const adminCookie = cookies.find((cookie) => cookie.startsWith(`${COOKIE_NAME}=`));
  return adminCookie?.split("=")[1] ?? null;
}

export function getAdminCookieHeader(token: string) {
  return `${COOKIE_NAME}=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${COOKIE_MAX_AGE};`; 
}

export function clearAdminCookieHeader() {
  return `${COOKIE_NAME}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0;`;
}
