import { getSanityReadClient, sanityWriteClient } from "@/sanity/client";
import { isSanityConfigured } from "@/sanity/env";
import { mapSanityProduct } from "@/sanity/mapProduct";
import { productsQuery, storeSettingsQuery } from "@/sanity/queries";
import type { Product } from "@/lib/types";
import type { StoreSettings } from "@/lib/catalog";
import { slugifyName } from "@/lib/slugify";

export type AdminProduct = Product & { sanityId: string };

const adminProductFields = `{
  _id,
  legacyId,
  "slug": slug.current,
  name,
  price,
  compareAtPrice,
  categoryId,
  description,
  composition,
  image,
  legacyImagePath,
  isNew,
  isPopular,
  isPromo,
  createdAt,
  sizes
}`;

export async function adminListProducts(): Promise<AdminProduct[]> {
  if (!isSanityConfigured()) return [];
  const docs = await getSanityReadClient().fetch<
    (Parameters<typeof mapSanityProduct>[0] & { _id: string })[]
  >(`*[_type == "product"] | order(name asc) ${adminProductFields}`);
  return docs.map((d) => ({ ...mapSanityProduct(d), sanityId: d._id }));
}

export async function adminGetProduct(sanityId: string): Promise<AdminProduct | null> {
  if (!isSanityConfigured()) return null;
  const doc = await getSanityReadClient().fetch<
    (Parameters<typeof mapSanityProduct>[0] & { _id: string }) | null
  >(`*[_type == "product" && _id == $id][0] ${adminProductFields}`, { id: sanityId });
  if (!doc) return null;
  return { ...mapSanityProduct(doc), sanityId: doc._id };
}

export async function adminGetStore(): Promise<StoreSettings | null> {
  if (!isSanityConfigured()) return null;
  return getSanityReadClient().fetch<StoreSettings | null>(storeSettingsQuery);
}

export type OrderLineRow = {
  productName?: string;
  quantity?: number;
  unitPrice?: number;
  sizeLabel?: string;
};

export type OrderRow = {
  _id: string;
  orderNumber?: string;
  status?: string;
  customerName?: string;
  phone?: string;
  deliveryMethod?: string;
  address?: string;
  deliveryDate?: string;
  deliveryTime?: string;
  comment?: string;
  subtotal?: number;
  placedAt?: string;
  lines?: OrderLineRow[];
};

export async function adminListOrders(): Promise<OrderRow[]> {
  if (!isSanityConfigured()) return [];
  return getSanityReadClient().fetch<OrderRow[]>(
    `*[_type == "order"] | order(placedAt desc) [0...100] {
      _id,
      orderNumber,
      status,
      customerName,
      phone,
      deliveryMethod,
      address,
      deliveryDate,
      deliveryTime,
      comment,
      subtotal,
      placedAt,
      lines
    }`,
  );
}

export type ProductInput = {
  name: string;
  price: number;
  compareAtPrice?: number;
  categoryId: string;
  description?: string;
  composition?: string;
  isNew?: boolean;
  isPopular?: boolean;
  isPromo?: boolean;
  imageAssetId?: string;
  legacyImagePath?: string;
};

export async function adminCreateProduct(input: ProductInput): Promise<string> {
  const client = sanityWriteClient();
  const baseSlug = slugifyName(input.name);
  const slug = `${baseSlug}-${Date.now().toString(36)}`;
  const doc = await client.create({
    _type: "product",
    name: input.name.trim(),
    slug: { _type: "slug", current: slug },
    legacyId: slug,
    price: input.price,
    compareAtPrice: input.compareAtPrice || undefined,
    categoryId: input.categoryId,
    description: input.description?.trim() ?? "",
    composition: input.composition?.trim() ?? "",
    isNew: input.isNew ?? false,
    isPopular: input.isPopular ?? false,
    isPromo: input.isPromo ?? false,
    createdAt: new Date().toISOString().slice(0, 10),
    ...(input.imageAssetId
      ? { image: { _type: "image", asset: { _type: "reference", _ref: input.imageAssetId } } }
      : input.legacyImagePath
        ? { legacyImagePath: input.legacyImagePath }
        : {}),
  });
  return doc._id;
}

export async function adminUpdateProduct(
  sanityId: string,
  input: ProductInput,
): Promise<void> {
  const client = sanityWriteClient();
  const patch: Record<string, unknown> = {
    name: input.name.trim(),
    price: input.price,
    compareAtPrice: input.compareAtPrice || null,
    categoryId: input.categoryId,
    description: input.description?.trim() ?? "",
    composition: input.composition?.trim() ?? "",
    isNew: input.isNew ?? false,
    isPopular: input.isPopular ?? false,
    isPromo: input.isPromo ?? false,
  };
  if (input.imageAssetId) {
    patch.image = {
      _type: "image",
      asset: { _type: "reference", _ref: input.imageAssetId },
    };
  }
  await client.patch(sanityId).set(patch).commit();
}

export async function adminDeleteProduct(sanityId: string): Promise<void> {
  await sanityWriteClient().delete(sanityId);
}

export async function adminUpdateOrderStatus(
  orderId: string,
  status: string,
): Promise<void> {
  await sanityWriteClient().patch(orderId).set({ status }).commit();
}

export async function adminDeleteOrder(orderId: string): Promise<void> {
  await sanityWriteClient().delete(orderId);
}

export async function adminUpdateStore(data: StoreSettings): Promise<void> {
  await sanityWriteClient().createOrReplace({
    _id: "storeSettings",
    _type: "storeSettings",
    ...data,
  });
}

export async function adminUploadImage(file: File): Promise<string> {
  const client = sanityWriteClient();
  const buffer = Buffer.from(await file.arrayBuffer());
  const asset = await client.assets.upload("image", buffer, {
    filename: file.name || "product.jpg",
  });
  return asset._id;
}
