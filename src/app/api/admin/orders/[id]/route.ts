import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { adminDeleteOrder, adminUpdateOrderStatus } from "@/lib/admin-sanity";

type Ctx = { params: Promise<{ id: string }> };

export async function PATCH(request: Request, { params }: Ctx) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  const { status } = (await request.json()) as { status?: string };
  if (!status) {
    return NextResponse.json({ error: "Missing status" }, { status: 400 });
  }
  try {
    await adminUpdateOrderStatus(id, status);
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Помилка" }, { status: 500 });
  }
}

export async function DELETE(_request: Request, { params }: Ctx) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  try {
    await adminDeleteOrder(id);
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Не вдалося видалити" }, { status: 500 });
  }
}
