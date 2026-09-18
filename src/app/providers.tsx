"use client";

import { CartProvider } from "@/context/CartContext";
import { CatalogProvider } from "@/context/CatalogContext";
import type { StoreSettings } from "@/lib/catalog";
import type { Product } from "@/lib/types";

export function Providers({
  products,
  store,
  children,
}: {
  products: Product[];
  store: StoreSettings;
  children: React.ReactNode;
}) {
  return (
    <CatalogProvider products={products} store={store}>
      <CartProvider>{children}</CartProvider>
    </CatalogProvider>
  );
}
