import crypto from "crypto";
import { cookies } from "next/headers";

const COOKIE = "bloom_admin";
const MAX_AGE_SEC = 60 * 60 * 24 * 14;

function secret(): string {
  return process.env.ADMIN_PASSWORD || process.env.SANITY_API_WRITE_TOKEN || "dev-only";
}

export function adminPasswordConfigured(): boolean {
  return Boolean(process.env.ADMIN_PASSWORD?.trim());
}

export function verifyAdminPassword(password: string): boolean {
  const expected = process.env.ADMIN_PASSWORD?.trim();
  if (!expected) return false;
  return password === expected;
}

export function createSessionValue(): string {
  const exp = Date.now() + MAX_AGE_SEC * 1000;
  const sig = crypto.createHmac("sha256", secret()).update(String(exp)).digest("hex");
  return `${exp}.${sig}`;
}

export function isValidSessionValue(value: string | undefined): boolean {
  if (!value) return false;
  const [expStr, sig] = value.split(".");
  const exp = Number(expStr);
  if (!exp || !sig || Date.now() > exp) return false;
  const expected = crypto.createHmac("sha256", secret()).update(String(exp)).digest("hex");
  if (sig.length !== expected.length) return false;
  return crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected));
}

export async function isAdminAuthenticated(): Promise<boolean> {
  if (!adminPasswordConfigured()) return false;
  const jar = await cookies();
  return isValidSessionValue(jar.get(COOKIE)?.value);
}

export function sessionCookieOptions(value: string) {
  return {
    name: COOKIE,
    value,
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: MAX_AGE_SEC,
  };
}

export function clearSessionCookieOptions() {
  return {
    name: COOKIE,
    value: "",
    httpOnly: true,
    path: "/",
    maxAge: 0,
  };
}
