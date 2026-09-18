"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  type ReactNode,
} from "react";
import type { StoreSettings } from "@/lib/catalog";
import {
  filterProducts,
  getProductPrice,
  getRelatedProducts,
  sortProducts,
  type SortKey,
} from "@/lib/product-utils";
import type { Product } from "@/lib/types";

type CatalogContextValue = {
  products: Product[];
  store: StoreSettings;
  getProductById: (id: string) => Product | undefined;
  getProductBySlug: (slug: string) => Product | undefined;
  getProductPrice: typeof getProductPrice;
  getRelatedProducts: (product: Product, limit?: number) => Product[];
  filterProducts: typeof filterProducts;
  sortProducts: typeof sortProducts;
};

const CatalogContext = createContext<CatalogContextValue | null>(null);

export function CatalogProvider({
  products,
  store,
  children,
}: {
  products: Product[];
  store: StoreSettings;
  children: ReactNode;
}) {
  const byId = useMemo(() => new Map(products.map((p) => [p.id, p])), [products]);
  const bySlug = useMemo(
    () => new Map(products.map((p) => [p.slug, p])),
    [products],
  );

  const getProductById = useCallback(
    (id: string) => byId.get(id) ?? products.find((p) => p.slug === id),
    [byId, products],
  );

  const getProductBySlug = useCallback(
    (slug: string) => bySlug.get(slug),
    [bySlug],
  );

  const related = useCallback(
    (product: Product, limit?: number) =>
      getRelatedProducts(products, product, limit),
    [products],
  );

  const value = useMemo(
    () => ({
      products,
      store,
      getProductById,
      getProductBySlug,
      getProductPrice,
      getRelatedProducts: related,
      filterProducts,
      sortProducts,
    }),
    [products, store, getProductById, getProductBySlug, related],
  );

  return (
    <CatalogContext.Provider value={value}>{children}</CatalogContext.Provider>
  );
}

export function useCatalog(): CatalogContextValue {
  const ctx = useContext(CatalogContext);
  if (!ctx) throw new Error("useCatalog must be used within CatalogProvider");
  return ctx;
}

export type { SortKey };
