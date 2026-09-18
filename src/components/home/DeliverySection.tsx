import { store } from "@/data/store";
import { Container } from "@/components/ui/Container";

const steps = [
  { title: "Оберіть букет", text: "Додайте товар у кошик прямо з каталогу на головній." },
  { title: "Оформіть замовлення", text: "Вкажіть імʼя, телефон, спосіб отримання та зручний час." },
  { title: "Отримайте квіти", text: "Доставка курʼєром або самовивіз з магазину за адресою нижче." },
];

export function DeliverySection() {
  return (
    <section id="delivery" className="scroll-mt-[4.5rem] bg-cream py-14 sm:py-16">
      <Container className="grid gap-10 lg:grid-cols-2 lg:items-start">
        <div>
          <h2 className="font-display text-2xl text-forest sm:text-3xl">Доставка</h2>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-muted">
            Працюємо в {store.city}. Після оформлення замовлення менеджер уточнить деталі
            доставки або самовивозу за телефоном {store.phone}.
          </p>
          <p className="mt-4 text-sm font-medium text-forest">{store.address}</p>
        </div>

        <ol className="space-y-6 rounded-2xl border border-line bg-white p-6">
          {steps.map((step, i) => (
            <li key={step.title} className="flex gap-4">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sand text-sm font-medium text-blush">
                {i + 1}
              </span>
              <div>
                <h3 className="font-medium text-forest">{step.title}</h3>
                <p className="mt-1 text-sm text-muted">{step.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
