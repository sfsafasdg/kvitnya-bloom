import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { adminUpdateStore } from "@/lib/admin-sanity";
import type { StoreSettings } from "@/lib/catalog";
import { revalidateStorefront } from "@/lib/revalidate-catalog";

export async function PUT(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = (await request.json()) as StoreSettings;
  try {
    await adminUpdateStore(body);
    revalidateStorefront();
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Не вдалося зберегти" }, { status: 500 });
  }
}
