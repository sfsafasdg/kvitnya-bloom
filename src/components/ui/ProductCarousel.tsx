"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Product } from "@/lib/types";
import { ProductCard } from "@/components/product/ProductCard";
import { cn } from "@/lib/cn";

type ProductCarouselProps = {
  products: Product[];
  className?: string;
  ariaLabel: string;
};

export function ProductCarousel({
  products,
  className,
  ariaLabel,
}: ProductCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollState = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollLeft(scrollLeft > 4);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 4);
  }, []);

  useEffect(() => {
    updateScrollState();
    window.addEventListener("resize", updateScrollState);
    return () => window.removeEventListener("resize", updateScrollState);
  }, [updateScrollState, products.length]);

  const scrollBy = (dir: -1 | 1) => {
    const el = trackRef.current;
    if (!el) return;
    const step = el.clientWidth * 0.72;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  if (products.length === 0) return null;

  return (
    <div className={cn("relative", className)}>
      <div className="hidden md:pointer-events-none md:absolute md:inset-y-0 md:left-0 md:z-10 md:flex md:w-12 md:items-center md:justify-start">
        <button
          type="button"
          aria-label="Попередні"
          disabled={!canScrollLeft}
          onClick={() => scrollBy(-1)}
          className="pointer-events-auto flex h-9 w-9 items-center justify-center rounded-full border border-line bg-cream/95 text-forest shadow-sm transition-opacity disabled:opacity-0"
        >
          <Chevron dir="left" />
        </button>
      </div>
      <div className="hidden md:pointer-events-none md:absolute md:inset-y-0 md:right-0 md:z-10 md:flex md:w-12 md:items-center md:justify-end">
        <button
          type="button"
          aria-label="Наступні"
          disabled={!canScrollRight}
          onClick={() => scrollBy(1)}
          className="pointer-events-auto flex h-9 w-9 items-center justify-center rounded-full border border-line bg-cream/95 text-forest shadow-sm transition-opacity disabled:opacity-0"
        >
          <Chevron dir="right" />
        </button>
      </div>

      <div
        ref={trackRef}
        role="region"
        aria-label={ariaLabel}
        onScroll={updateScrollState}
        className="flex gap-4 overflow-x-auto overscroll-x-contain scroll-smooth pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden max-md:snap-x max-md:snap-mandatory max-md:px-0 md:gap-5"
      >
        {products.map((product) => (
          <div
            key={product.id}
            className="w-[72vw] max-w-[280px] shrink-0 snap-start sm:w-[42vw] md:w-[calc(25%-15px)] md:max-w-none md:shrink"
          >
            <ProductCard product={product} compact />
          </div>
        ))}
      </div>
    </div>
  );
}

function Chevron({ dir }: { dir: "left" | "right" }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d={dir === "left" ? "M15 6l-6 6 6 6" : "M9 6l6 6-6 6"}
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
