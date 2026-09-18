import type { Product } from "@/lib/types";

export function getProductPrice(product: Product, sizeId?: string): number {
  if (!sizeId || !product.sizes) return product.price;
  const size = product.sizes.find((s) => s.id === sizeId);
  return product.price + (size?.priceModifier ?? 0);
}

export type SortKey = "newest" | "price-asc" | "price-desc";

export function sortProducts(list: Product[], sort: SortKey): Product[] {
  const copy = [...list];
  switch (sort) {
    case "price-asc":
      return copy.sort((a, b) => a.price - b.price);
    case "price-desc":
      return copy.sort((a, b) => b.price - a.price);
    default:
      return copy.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
  }
}

export function filterProducts(
  list: Product[],
  categoryId: string,
  minPrice?: number,
  maxPrice?: number,
): Product[] {
  return list.filter((p) => {
    if (categoryId === "new") {
      if (!p.isNew) return false;
    } else if (categoryId !== "all" && p.categoryId !== categoryId) {
      return false;
    }
    if (minPrice != null && p.price < minPrice) return false;
    if (maxPrice != null && p.price > maxPrice) return false;
    return true;
  });
}

export function getRelatedProducts(
  products: Product[],
  product: Product,
  limit = 8,
): Product[] {
  const same = products.filter(
    (p) => p.categoryId === product.categoryId && p.id !== product.id,
  );
  if (same.length >= limit) return same.slice(0, limit);
  const rest = products.filter(
    (p) => p.id !== product.id && p.categoryId !== product.categoryId,
  );
  return [...same, ...rest].slice(0, limit);
}
