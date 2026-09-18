import { store as staticStore } from "@/data/store";
import { products as staticProducts } from "@/data/products";
import { mapSanityProduct } from "@/sanity/mapProduct";
import { getSanityReadClient } from "@/sanity/client";
import { isSanityConfigured } from "@/sanity/env";
import {
  productBySlugQuery,
  productsQuery,
  storeSettingsQuery,
} from "@/sanity/queries";
import type { Product } from "@/lib/types";

export type StoreSettings = {
  name: string;
  mark: string;
  submark: string;
  address: string;
  phone: string;
  phoneTel: string;
  hours: string;
  city: string;
  instagram: string;
  instagramHandle: string;
};

export async function fetchProducts(): Promise<Product[]> {
  if (!isSanityConfigured()) return staticProducts;
  try {
    const docs = await getSanityReadClient().fetch<Parameters<
      typeof mapSanityProduct
    >[0][]>(productsQuery);
    if (!docs?.length) return staticProducts;
    return docs.map(mapSanityProduct);
  } catch {
    return staticProducts;
  }
}

export async function fetchProductBySlug(
  slug: string,
): Promise<Product | undefined> {
  if (!isSanityConfigured()) {
    return staticProducts.find((p) => p.slug === slug);
  }
  try {
    const doc = await getSanityReadClient().fetch<
      Parameters<typeof mapSanityProduct>[0] | null
    >(productBySlugQuery, { slug });
    if (!doc) {
      return staticProducts.find((p) => p.slug === slug);
    }
    return mapSanityProduct(doc);
  } catch {
    return staticProducts.find((p) => p.slug === slug);
  }
}

export async function fetchAllProductSlugs(): Promise<string[]> {
  const list = await fetchProducts();
  return list.map((p) => p.slug);
}

export async function fetchStoreSettings(): Promise<StoreSettings> {
  if (!isSanityConfigured()) return { ...staticStore };
  try {
    const doc = await getSanityReadClient().fetch<StoreSettings | null>(
      storeSettingsQuery,
    );
    if (!doc) return { ...staticStore };
    return { ...staticStore, ...doc };
  } catch {
    return { ...staticStore };
  }
}
