import { NextResponse } from "next/server";
import {
  adminPasswordConfigured,
  createSessionValue,
  sessionCookieOptions,
  verifyAdminPassword,
} from "@/lib/admin-auth";

export async function POST(request: Request) {
  if (!adminPasswordConfigured()) {
    return NextResponse.json(
      { error: "ADMIN_PASSWORD не налаштовано на сервері" },
      { status: 503 },
    );
  }
  const { password } = (await request.json()) as { password?: string };
  if (!password || !verifyAdminPassword(password)) {
    return NextResponse.json({ error: "Невірний пароль" }, { status: 401 });
  }
  const res = NextResponse.json({ ok: true });
  res.cookies.set(sessionCookieOptions(createSessionValue()));
  return res;
}
