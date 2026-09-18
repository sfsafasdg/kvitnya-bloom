import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { adminCreateProduct, type ProductInput } from "@/lib/admin-sanity";

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = (await request.json()) as ProductInput;
  if (!body.name?.trim() || !body.categoryId || body.price == null) {
    return NextResponse.json({ error: "Заповніть назву, категорію і ціну" }, { status: 400 });
  }
  try {
    const id = await adminCreateProduct(body);
    revalidatePath("/", "layout");
    return NextResponse.json({ ok: true, id });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Не вдалося зберегти" }, { status: 500 });
  }
}
