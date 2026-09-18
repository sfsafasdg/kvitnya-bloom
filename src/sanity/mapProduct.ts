import type { Product } from "@/lib/types";
import { urlForImage } from "./image";

type SanityProductDoc = {
  _id: string;
  legacyId?: string;
  slug: string;
  name: string;
  price: number;
  compareAtPrice?: number;
  categoryId: Product["categoryId"];
  description?: string;
  composition?: string;
  image?: Parameters<typeof urlForImage>[0];
  legacyImagePath?: string;
  gallery?: Parameters<typeof urlForImage>[0][];
  isNew?: boolean;
  isPopular?: boolean;
  isPromo?: boolean;
  createdAt?: string;
  sizes?: Product["sizes"];
};

function resolveImage(doc: SanityProductDoc): string {
  const fromAsset = urlForImage(doc.image);
  if (fromAsset) return fromAsset;
  if (doc.legacyImagePath) return doc.legacyImagePath;
  return "/products/bloom-01.png";
}

function resolveGallery(doc: SanityProductDoc, main: string): string[] {
  const extra =
    doc.gallery
      ?.map((g) => urlForImage(g))
      .filter((u): u is string => Boolean(u)) ?? [];
  if (extra.length > 0) return [main, ...extra.filter((u) => u !== main)];
  return [main];
}

export function mapSanityProduct(doc: SanityProductDoc): Product {
  const image = resolveImage(doc);
  return {
    id: doc.legacyId || doc.slug || doc._id,
    slug: doc.slug,
    name: doc.name,
    price: doc.price,
    compareAtPrice: doc.compareAtPrice,
    categoryId: doc.categoryId,
    description: doc.description ?? "",
    composition: doc.composition ?? "",
    image,
    images: resolveGallery(doc, image),
    sizes: doc.sizes,
    isNew: doc.isNew,
    isPopular: doc.isPopular,
    isPromo: doc.isPromo,
    createdAt: doc.createdAt ?? new Date().toISOString().slice(0, 10),
  };
}
