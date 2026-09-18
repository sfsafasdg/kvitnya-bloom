"use client";

import { useCatalog } from "@/context/CatalogContext";
import { Container } from "@/components/ui/Container";

export function DeliverySection() {
  const { store } = useCatalog();
  return (
    <section id="delivery" className="scroll-mt-[4.5rem] bg-sand/50 py-14 sm:py-16">
      <Container className="max-w-2xl">
        <h2 className="font-display text-2xl text-forest sm:text-3xl">Доставка</h2>
        <div className="mt-6 space-y-4 text-muted leading-relaxed">
          <p>
            Працюємо в {store.city}. Після оформлення замовлення менеджер уточнить деталі
            доставки або самовивозу за телефоном {store.phone}.
          </p>
          <p className="mt-4 text-sm font-medium text-forest">{store.address}</p>
        </div>
      </Container>
    </section>
  );
}
