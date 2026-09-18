"use client";

import { useCatalog } from "@/context/CatalogContext";
import { Container } from "@/components/ui/Container";

export function Benefits() {
  const { store } = useCatalog();
  const items = [
    {
      title: "Свіжі квіти",
      text: "Працюємо з перевіреними постачальниками та збираємо букети перед відправкою.",
    },
    {
      title: "Доставка по місту",
      text: "Курʼєр у Білій Церкві або самовивіз зі студії на вул. Героїв Небесної Сотні.",
    },
    {
      title: "Гнучкий графік",
      text: `${store.hours} — замовлення вранці або ввечері.`,
    },
  ];

  return (
    <section className="border-y border-line bg-white py-14 sm:py-16">
      <Container>
        <h2 className="font-display text-2xl text-forest sm:text-3xl">
          {store.name}
        </h2>
        <ul className="mt-10 grid gap-8 sm:grid-cols-3">
          {items.map((item) => (
            <li key={item.title}>
              <h3 className="font-display text-lg text-forest">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{item.text}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
