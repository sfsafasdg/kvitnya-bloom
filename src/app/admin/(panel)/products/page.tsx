import Image from "next/image";
import Link from "next/link";
import { adminListProducts } from "@/lib/admin-sanity";
import { formatPrice } from "@/lib/format";
import { getCategoryTitle } from "@/data/categories";

export default async function AdminProductsPage() {
  const products = await adminListProducts();

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-display text-3xl text-forest">Товари</h1>
        <Link
          href="/admin/products/new"
          className="rounded-2xl bg-forest px-6 py-3 text-sm font-semibold text-cream hover:bg-forest/90"
        >
          + Новий товар
        </Link>
      </div>
      <ul className="mt-8 space-y-3">
        {products.map((p) => (
          <li key={p.sanityId}>
            <Link
              href={`/admin/products/${encodeURIComponent(p.sanityId)}/edit`}
              className="flex items-center gap-4 rounded-2xl border border-line bg-white p-3 shadow-sm transition hover:border-forest/20"
            >
              <div className="relative h-16 w-14 shrink-0 overflow-hidden rounded-lg bg-sand">
                <Image src={p.image} alt="" fill className="object-cover" sizes="56px" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate font-medium text-forest">{p.name}</p>
                <p className="text-sm text-muted">
                  {getCategoryTitle(p.categoryId)} · {formatPrice(p.price)}
                </p>
              </div>
              <span className="shrink-0 text-sm text-blush">Змінити →</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
