import { Suspense } from "react";
import { CatalogView } from "@/components/catalog/CatalogView";
import { Container } from "@/components/ui/Container";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Повний каталог",
};

export default function CatalogPage() {
  return (
    <div className="bg-cream py-10 sm:py-14">
      <Container>
        <Suspense
          fallback={
            <p className="text-center text-muted">Завантаження каталогу…</p>
          }
        >
          <CatalogView />
        </Suspense>
      </Container>
    </div>
  );
}
