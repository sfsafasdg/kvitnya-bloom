import { NextResponse } from "next/server";
import { digitsAfter380, isValidUaPhone, toE164Ua } from "@/lib/phone-ua";
import { isSanityConfigured } from "@/sanity/env";
import { sanityWriteClient } from "@/sanity/client";

type OrderLine = {
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  sizeLabel?: string;
};

type OrderBody = {
  customerName: string;
  phone: string;
  deliveryMethod: "courier" | "pickup";
  address: string;
  date: string;
  time: string;
  comment: string;
  subtotal: number;
  lines: OrderLine[];
};

export async function POST(request: Request) {
  let body: OrderBody;
  try {
    body = (await request.json()) as OrderBody;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!body.customerName?.trim()) {
    return NextResponse.json({ error: "Missing contact fields" }, { status: 400 });
  }
  const nine = digitsAfter380(body.phone ?? "");
  if (!isValidUaPhone(nine)) {
    return NextResponse.json({ error: "invalid_phone" }, { status: 400 });
  }
  const phone = toE164Ua(nine);

  if (!isSanityConfigured()) {
    return NextResponse.json(
      {
        error: "orders_disabled",
        message: "Замовлення не налаштовані (немає Sanity). Додайте ключі в .env",
      },
      { status: 503 },
    );
  }

  try {
    const client = sanityWriteClient();
    const orderNumber = `BF-${Date.now().toString(36).toUpperCase()}`;
    const doc = await client.create({
      _type: "order",
      orderNumber,
      status: "new",
      customerName: body.customerName.trim(),
      phone,
      deliveryMethod: body.deliveryMethod,
      address: body.address?.trim() ?? "",
      deliveryDate: body.date,
      deliveryTime: body.time,
      comment: body.comment?.trim() ?? "",
      lines: body.lines ?? [],
      subtotal: body.subtotal,
      placedAt: new Date().toISOString(),
    });

    return NextResponse.json({ ok: true, id: doc._id, orderNumber });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Failed to save order" },
      { status: 500 },
    );
  }
}
