"use client";

import { useCatalog } from "@/context/CatalogContext";
import { cn } from "@/lib/cn";

export function InstagramIconLink({ variant = "footer" }: { variant?: "footer" | "contacts" }) {
  const { store } = useCatalog();
  return (
    <a
      href={store.instagram}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Bloom Flowers в Instagram"
      className={cn(
        "inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border transition-colors",
        variant === "contacts"
          ? "border-cream/25 text-cream/85 hover:border-cream/45 hover:bg-cream/10 hover:text-cream"
          : "border-cream/20 text-cream/80 hover:border-cream/40 hover:bg-cream/10 hover:text-cream",
      )}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
        <rect
          x="3"
          y="3"
          width="18"
          height="18"
          rx="5"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
      </svg>
    </a>
  );
}
