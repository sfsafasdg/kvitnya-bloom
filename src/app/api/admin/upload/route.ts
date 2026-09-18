import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { adminUploadImage } from "@/lib/admin-sanity";

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const form = await request.formData();
  const file = form.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Немає файлу" }, { status: 400 });
  }
  try {
    const assetId = await adminUploadImage(file);
    return NextResponse.json({ ok: true, assetId });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Не вдалося завантажити фото" }, { status: 500 });
  }
}
