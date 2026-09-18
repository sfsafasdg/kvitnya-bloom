"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/ui/Container";
import { store } from "@/data/store";
import { useCart } from "@/context/CartContext";
import { cn } from "@/lib/cn";

const nav = [
  { href: "/catalog", label: "Повний каталог" },
  { href: "/#delivery", label: "Доставка" },
  { href: "/#contacts", label: "Контакти" },
];

export function Header() {
  const { itemCount } = useCart();
  const [open, setOpen] = useState(false);
  const [cartBump, setCartBump] = useState(false);
  const prevCount = useRef(itemCount);

  useEffect(() => {
    if (itemCount > prevCount.current) {
      setCartBump(true);
      const t = window.setTimeout(() => setCartBump(false), 450);
      prevCount.current = itemCount;
      return () => window.clearTimeout(t);
    }
    prevCount.current = itemCount;
  }, [itemCount]);

  return (
    <header className="sticky top-0 z-50 border-b border-line/80 bg-cream/95 backdrop-blur-md">
      <Container className="flex h-16 items-center justify-between gap-4">
        <Link
          href="/"
          className="group flex items-center gap-2.5"
          onClick={() => setOpen(false)}
        >
          <span className="flex flex-col leading-none">
            <span className="font-brand text-[1.25rem] font-medium tracking-[0.04em] text-forest">
              {store.mark}
            </span>
            <span className="font-brand -mt-0.5 text-[0.8125rem] italic text-muted">
              {store.submark}
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[13px] font-medium tracking-[0.02em] text-muted transition-colors hover:text-forest"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/cart"
            className={cn(
              "group relative flex h-10 w-10 items-center justify-center rounded-full border border-line/90 bg-white text-forest shadow-sm transition-all duration-300 hover:border-forest/20 hover:shadow-md",
              cartBump && "scale-105 border-blush/30",
            )}
            aria-label={itemCount > 0 ? `Кошик, ${itemCount} товарів` : "Кошик"}
          >
            <CartIcon />
            {itemCount > 0 ? (
              <span className="absolute -right-1 -top-1 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-forest px-1 text-[10px] font-semibold leading-none text-cream">
                {itemCount > 99 ? "99+" : itemCount}
              </span>
            ) : null}
          </Link>

          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-line bg-white md:hidden"
            aria-label="Меню"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">Меню</span>
            <div className="flex w-4 flex-col gap-1">
              <span
                className={cn(
                  "h-0.5 bg-forest transition-transform",
                  open && "translate-y-1.5 rotate-45",
                )}
              />
              <span
                className={cn(
                  "h-0.5 bg-forest transition-opacity",
                  open && "opacity-0",
                )}
              />
              <span
                className={cn(
                  "h-0.5 bg-forest transition-transform",
                  open && "-translate-y-1.5 -rotate-45",
                )}
              />
            </div>
          </button>
        </div>
      </Container>

      {open ? (
        <div className="border-t border-line bg-cream px-5 py-4 md:hidden">
          <nav className="flex flex-col gap-3">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="py-2 text-[15px] font-medium text-forest"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      ) : null}
    </header>
  );
}

function CartIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      className="text-forest transition-transform duration-300 group-hover:scale-105"
      aria-hidden
    >
      <path
        d="M8 7V6a4 4 0 0 1 8 0v1"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <path
        d="M5 7h14l-1.4 8.4a1.5 1.5 0 0 1-1.48 1.25H7.88a1.5 1.5 0 0 1-1.48-1.25L5 7Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}
