"use client";

import Image from "next/image";
import Link from "next/link";
import { getProductById, getProductPrice } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/format";
import { Button } from "@/components/ui/Button";
import { ProductPrice } from "@/components/ui/ProductPrice";

export function CartView() {
  const { lines, subtotal, setQuantity, removeItem, lineKey } = useCart();

  if (lines.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-line bg-sand/30 px-6 py-16 text-center sm:py-20">
        <p className="font-display text-2xl font-normal text-forest">Кошик порожній</p>
        <p className="mt-2 text-sm text-muted">Додайте букет з каталогу — ми збережемо його тут.</p>
        <Button href="/catalog" className="mt-8">
          До каталогу
        </Button>
      </div>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_320px] lg:gap-10">
      <div>
        <h1 className="font-display text-2xl font-normal text-forest sm:text-3xl">Кошик</h1>
        <p className="mt-1 text-sm text-muted">
          {lines.reduce((n, l) => n + l.quantity, 0)} поз. у замовленні
        </p>
        <ul className="mt-6 space-y-4">
          {lines.map((line) => {
            const product = getProductById(line.productId);
            if (!product) return null;
            const unitPrice = getProductPrice(product, line.sizeId);
            const sizeLabel = product.sizes?.find((s) => s.id === line.sizeId)?.label;
            const lineTotal = unitPrice * line.quantity;

            return (
              <li
                key={lineKey(line)}
                className="flex gap-4 rounded-xl border border-line bg-white p-4 sm:gap-5 sm:p-5"
              >
                <Link
                  href={`/product/${product.slug}`}
                  className="relative h-24 w-20 shrink-0 overflow-hidden rounded-lg bg-sand sm:h-28 sm:w-24"
                >
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover object-center"
                    sizes="96px"
                  />
                </Link>
                <div className="flex min-w-0 flex-1 flex-col">
                  <Link
                    href={`/product/${product.slug}`}
                    className="font-display text-base leading-snug text-forest hover:text-blush sm:text-lg"
                  >
                    {product.name}
                  </Link>
                  {sizeLabel ? (
                    <p className="mt-1 text-xs text-muted">Розмір: {sizeLabel}</p>
                  ) : null}
                  <div className="mt-1">
                    <ProductPrice amount={unitPrice} size="card" className="!text-base" />
                  </div>

                  <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-4">
                    <div className="inline-flex items-center rounded-lg border border-line bg-cream">
                      <button
                        type="button"
                        className="flex h-9 w-9 items-center justify-center text-lg text-forest transition-colors hover:text-blush"
                        onClick={() =>
                          setQuantity(line.productId, line.quantity - 1, line.sizeId)
                        }
                        aria-label="Зменшити кількість"
                      >
                        −
                      </button>
                      <span className="min-w-8 text-center text-sm font-semibold tabular-nums">
                        {line.quantity}
                      </span>
                      <button
                        type="button"
                        className="flex h-9 w-9 items-center justify-center text-lg text-forest transition-colors hover:text-blush"
                        onClick={() =>
                          setQuantity(line.productId, line.quantity + 1, line.sizeId)
                        }
                        aria-label="Збільшити кількість"
                      >
                        +
                      </button>
                    </div>
                    <button
                      type="button"
                      className="text-sm text-muted underline-offset-4 transition-colors hover:text-blush hover:underline"
                      onClick={() => removeItem(line.productId, line.sizeId)}
                    >
                      Видалити
                    </button>
                  </div>
                </div>
                <p className="hidden shrink-0 text-right sm:block">
                  <span className="block text-xs text-muted">Сума</span>
                  <span className="font-display text-lg tabular-nums text-forest">
                    {formatPrice(lineTotal)}
                  </span>
                </p>
              </li>
            );
          })}
        </ul>
      </div>

      <aside className="h-fit rounded-xl border border-line bg-white p-5 sm:p-6 lg:sticky lg:top-24">
        <h2 className="font-display text-lg text-forest">Підсумок</h2>
        <dl className="mt-4 space-y-3 text-sm">
          <div className="flex justify-between gap-4 text-muted">
            <dt>Товари</dt>
            <dd className="tabular-nums text-forest">{formatPrice(subtotal)}</dd>
          </div>
          <div className="flex justify-between gap-4 text-muted">
            <dt>Доставка</dt>
            <dd className="text-right text-xs sm:text-sm">Уточнимо при оформленні</dd>
          </div>
        </dl>
        <div className="mt-4 flex justify-between border-t border-line pt-4">
          <span className="font-medium text-forest">Разом</span>
          <span className="font-display text-xl tabular-nums text-forest">
            {formatPrice(subtotal)}
          </span>
        </div>
        <Button href="/checkout" className="mt-6 w-full py-3.5">
          Оформити замовлення
        </Button>
        <Link
          href="/catalog"
          className="mt-4 block text-center text-sm text-muted transition-colors hover:text-forest"
        >
          Продовжити покупки
        </Link>
      </aside>
    </div>
  );
}
