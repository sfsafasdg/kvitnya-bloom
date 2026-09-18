import Link from "next/link";

export default function AdminHomePage() {
  const cards = [
    {
      href: "/admin/products/new",
      title: "Новий товар",
      text: "Додати позицію в каталог.",
    },
    {
      href: "/admin/products",
      title: "Каталог",
      text: "Редагування цін і фото.",
    },
    {
      href: "/admin/orders",
      title: "Замовлення",
      text: "Заявки з сайту.",
    },
    {
      href: "/admin/store",
      title: "Контакти",
      text: "Телефон, адреса, графік.",
    },
  ];

  return (
    <div>
      <h1 className="font-display text-3xl text-forest">Bloom Flowers</h1>
      <p className="mt-2 text-muted">Оберіть розділ.</p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {cards.map((c) => (
          <Link
            key={c.href}
            href={c.href}
            className="rounded-2xl border border-line bg-white p-6 shadow-sm transition hover:border-forest/25 hover:shadow-md"
          >
            <p className="font-display text-xl text-forest">{c.title}</p>
            <p className="mt-2 text-sm text-muted">{c.text}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
