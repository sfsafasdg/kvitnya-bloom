import { store } from "@/data/store";
import { Container } from "@/components/ui/Container";

const items = [
  {
    title: "Свіжі квіти",
    text: "Щоденне поповнення та акуратна обробка стебел перед збіркою.",
  },
  {
    title: "Зручний графік",
    text: `${store.hours} — замовлення вранці або ввечері.`,
  },
  {
    title: "Доставка по місту",
    text: "Доставляємо по Білій Церкві, час узгоджуємо з вами.",
  },
];

export function Benefits() {
  return (
    <section className="border-t border-line bg-sand py-12 sm:py-14">
      <Container>
        <h2 className="font-display text-xl text-forest sm:text-2xl">
          {store.name}
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {items.map((item) => (
            <div key={item.title} className="border-t border-line/80 pt-4">
              <h3 className="text-sm font-medium text-forest">{item.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">{item.text}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
