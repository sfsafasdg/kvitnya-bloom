"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useState } from "react";
import type { Product } from "@/lib/types";
import { useCart } from "@/context/CartContext";
import { ProductBadge } from "@/components/ui/ProductBadge";
import { ProductPrice } from "@/components/ui/ProductPrice";
import { cn } from "@/lib/cn";

const ADDED_MS = 2200;

export function ProductCard({
  product,
  className,
  compact = false,
}: {
  product: Product;
  className?: string;
  compact?: boolean;
}) {
  const { addItem } = useCart();
  const [justAdded, setJustAdded] = useState(false);

  const handleAdd = useCallback(() => {
    addItem(product.id, product.sizes?.[0]?.id, 1);
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), ADDED_MS);
  }, [addItem, product.id, product.sizes]);

  return (
    <article className={cn("group flex flex-col", className)}>
      <Link
        href={`/product/${product.slug}`}
        className="relative mb-3 aspect-[4/5] overflow-hidden rounded-xl bg-sand"
      >
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes={
            compact
              ? "(max-width: 640px) 72vw, 280px"
              : "(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          }
          className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-[1.02]"
        />
        {(product.isNew || product.isPopular || product.isPromo) && (
          <div className="absolute left-2 top-2 flex flex-col gap-1">
            {product.isPromo ? <ProductBadge kind="promo" /> : null}
            {product.isNew ? <ProductBadge kind="new" /> : null}
            {product.isPopular ? <ProductBadge kind="popular" /> : null}
          </div>
        )}
      </Link>

      <div className="flex flex-1 flex-col gap-2">
        <Link href={`/product/${product.slug}`}>
          <h3
            className={cn(
              "font-display font-normal leading-snug text-forest transition-colors group-hover:text-blush",
              compact ? "text-base" : "text-[1.0625rem] sm:text-lg",
            )}
          >
            {product.name}
          </h3>
        </Link>
        <ProductPrice
          amount={product.price}
          compareAt={product.compareAtPrice}
          size="card"
        />

        {compact ? (
          <AddToCartButton justAdded={justAdded} onClick={handleAdd} compact />
        ) : (
          <div className="mt-1 flex gap-2">
            <AddToCartButton justAdded={justAdded} onClick={handleAdd} className="flex-1" />
            <Link
              href={`/product/${product.slug}`}
              className="flex-1 rounded-lg border border-line py-2.5 text-center text-xs font-medium text-forest transition-colors hover:border-forest/20 hover:bg-white"
            >
              Детальніше
            </Link>
          </div>
        )}
      </div>
    </article>
  );
}

function AddToCartButton({
  justAdded,
  onClick,
  className,
  compact,
}: {
  justAdded: boolean;
  onClick: () => void;
  className?: string;
  compact?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-lg py-2.5 text-xs font-semibold transition-all duration-200",
        compact ? "mt-1 w-full" : "",
        className,
        justAdded
          ? "scale-[0.98] bg-blush text-cream"
          : "bg-forest text-cream hover:bg-forest/90 active:scale-[0.98]",
      )}
    >
      {justAdded ? "Додано ✓" : "До кошика"}
    </button>
  );
}
