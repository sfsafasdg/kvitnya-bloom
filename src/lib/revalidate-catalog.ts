import { revalidatePath, revalidateTag } from "next/cache";

export const CATALOG_CACHE_TAG = "catalog";

/** Після змін у адмінці — оновити вітрину без очікування хвилини */
export function revalidateStorefront(productSlug?: string, sanityId?: string) {
  revalidateTag(CATALOG_CACHE_TAG, "max");
  revalidatePath("/", "layout");
  revalidatePath("/catalog");
  revalidatePath("/");
  if (productSlug) {
    revalidatePath(`/product/${productSlug}`);
  }
  revalidatePath("/admin/products");
  if (sanityId) {
    revalidatePath(`/admin/products/${sanityId}/edit`);
  }
}
