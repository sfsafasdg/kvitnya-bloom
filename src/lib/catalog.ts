import { unstable_cache } from "next/cache";
import { createClient } from "next-sanity";
import { store as staticStore } from "@/data/store";
import { products as staticProducts } from "@/data/products";
import { mapSanityProduct } from "@/sanity/mapProduct";
import { isSanityConfigured, sanityEnv } from "@/sanity/env";
import {
  productBySlugQuery,
  productsQuery,
  storeSettingsQuery,
} from "@/sanity/queries";
import type { Product } from "@/lib/types";
import { CATALOG_CACHE_TAG } from "@/lib/revalidate-catalog";

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

function sanityCatalogClient() {
  return createClient({
    ...sanityEnv,
    useCdn: false,
  });
}

async function loadProductsFromSanity(): Promise<Product[]> {
  const docs = await sanityCatalogClient().fetch<
    Parameters<typeof mapSanityProduct>[0][]
  >(productsQuery);
  if (!docs?.length) return staticProducts;
  return docs.map(mapSanityProduct);
}

const getCachedProducts = unstable_cache(
  loadProductsFromSanity,
  ["bloom-catalog-products"],
  { tags: [CATALOG_CACHE_TAG], revalidate: 15 },
);

export async function fetchProducts(): Promise<Product[]> {
  if (!isSanityConfigured()) return staticProducts;
  try {
    return await getCachedProducts();
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
    const doc = await sanityCatalogClient().fetch<
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
    const doc = await sanityCatalogClient().fetch<StoreSettings | null>(
      storeSettingsQuery,
    );
    if (!doc) return { ...staticStore };
    return { ...staticStore, ...doc };
  } catch {
    return { ...staticStore };
  }
}
