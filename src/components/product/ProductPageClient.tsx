"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import type { Product } from "@/lib/types";
import { formatPrice } from "@/lib/format";
import { useCatalog } from "@/context/CatalogContext";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/Button";
import { ProductCarousel } from "@/components/ui/ProductCarousel";
import { ProductPrice } from "@/components/ui/ProductPrice";

export function ProductPageClient({ product }: { product: Product }) {
  const { getProductPrice, getRelatedProducts } = useCatalog();
  const { addItem, lines } = useCart();
  const [sizeId, setSizeId] = useState(product.sizes?.[0]?.id);
  const [activeImage, setActiveImage] = useState(0);
  const [justAdded, setJustAdded] = useState(false);
  const [addPulse, setAddPulse] = useState(false);
  const price = getProductPrice(product, sizeId);
  const related = getRelatedProducts(product, 8);

  const lineKey = `${product.id}:${sizeId ?? "default"}`;
  const inCart = useMemo(
    () =>
      lines.some(
        (l) => `${l.productId}:${l.sizeId ?? "default"}` === lineKey,
      ),
    [lines, lineKey],
  );

  const showGoToCart = justAdded || inCart;

  function handleAddToCart() {
    addItem(product.id, sizeId, 1);
    setJustAdded(true);
    setAddPulse(true);
    window.setTimeout(() => setAddPulse(false), 400);
  }

  return (
    <div className="min-w-0">
      <Link
        href="/catalog"
        className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-forest"
      >
        <span aria-hidden>←</span>
        Назад до каталогу
      </Link>

      <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
        <div className="min-w-0">
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-sand">
            <Image
              src={product.images[activeImage] ?? product.image}
              alt={product.name}
              fill
              priority
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          {product.images.length > 1 ? (
            <div className="mt-3 flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {product.images.map((src, i) => (
                <button
                  key={src}
                  type="button"
                  onClick={() => setActiveImage(i)}
                  className={`relative h-16 w-14 shrink-0 overflow-hidden rounded-lg border transition-colors ${
                    activeImage === i ? "border-forest" : "border-line"
                  }`}
                >
                  <Image src={src} alt="" fill className="object-cover object-center" sizes="56px" />
                </button>
              ))}
            </div>
          ) : null}
        </div>

        <div className="min-w-0">
          <h1 className="font-display text-[1.75rem] font-normal leading-snug text-forest sm:text-4xl">
            {product.name}
          </h1>
          <div className="mt-3">
            <ProductPrice
              amount={price}
              compareAt={product.compareAtPrice}
              size="page"
            />
          </div>

          <p className="mt-5 text-sm leading-relaxed text-muted sm:text-[15px]">
            {product.description}
          </p>
          <p className="mt-4 border-t border-line pt-4 text-sm text-muted">
            <span className="font-medium text-forest">Склад: </span>
            {product.composition}
          </p>

          {product.sizes && product.sizes.length > 0 ? (
            <div className="mt-6">
              <p className="text-sm font-medium text-forest">Розмір</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size.id}
                    type="button"
                    onClick={() => setSizeId(size.id)}
                    className={`rounded-lg border px-3 py-2 text-sm transition-colors ${
                      sizeId === size.id
                        ? "border-forest bg-forest text-cream"
                        : "border-line bg-white text-forest hover:border-forest/25"
                    }`}
                  >
                    {size.label}
                    {size.priceModifier > 0
                      ? ` (+${formatPrice(size.priceModifier)})`
                      : ""}
                  </button>
                ))}
              </div>
            </div>
          ) : null}

          <div className="mt-8 flex w-full max-w-md flex-col gap-2.5">
            <Button
              className={`w-full transition-all duration-200 ${addPulse ? "scale-[0.98] bg-blush hover:bg-blush" : ""}`}
              onClick={handleAddToCart}
            >
              Додати до кошика
            </Button>
            {showGoToCart ? (
              <Button href="/cart" variant="outline" className="w-full bg-white">
                Перейти до кошика
              </Button>
            ) : null}
          </div>
        </div>
      </div>

      {related.length > 0 ? (
        <section className="mt-14 border-t border-line pt-10 sm:mt-16 sm:pt-12">
          <h2 className="font-display text-xl font-normal text-forest sm:text-2xl">
            Схожі букети
          </h2>
          <ProductCarousel
            className="mt-6"
            products={related}
            ariaLabel="Схожі букети"
          />
        </section>
      ) : null}
    </div>
  );
}
