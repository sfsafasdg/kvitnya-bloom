"use client";

import { useCatalog } from "@/context/CatalogContext";
import { Container } from "@/components/ui/Container";

export function MinimalStoreBar() {
  const { store } = useCatalog();
  return (
    <div className="border-b border-line/70 bg-white/80 text-xs text-muted">
      <Container className="flex flex-wrap items-center justify-between gap-2 py-2.5">
        <p>
          <span className="font-medium text-forest">{store.name}</span>
          <span className="mx-2 text-line">·</span>
          <span className="hidden sm:inline">{store.city}</span>
        </p>
        <p className="tabular-nums">{store.hours}</p>
      </Container>
    </div>
  );
}
