import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import {
  adminDeleteProduct,
  adminUpdateProduct,
  type ProductInput,
} from "@/lib/admin-sanity";

type Ctx = { params: Promise<{ id: string }> };

export async function PATCH(request: Request, { params }: Ctx) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  const body = (await request.json()) as ProductInput;
  try {
    await adminUpdateProduct(id, body);
    revalidatePath("/", "layout");
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Не вдалося оновити" }, { status: 500 });
  }
}

export async function DELETE(_request: Request, { params }: Ctx) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  try {
    await adminDeleteProduct(id);
    revalidatePath("/", "layout");
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Не вдалося видалити" }, { status: 500 });
  }
}
