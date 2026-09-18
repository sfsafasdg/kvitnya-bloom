import Link from "next/link";
import { categories } from "@/data/categories";
import { store } from "@/data/store";
import { Container } from "@/components/ui/Container";
import { InstagramIconLink } from "@/components/ui/InstagramIconLink";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-line bg-forest text-cream/85">
      <Container className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="font-brand text-2xl font-medium tracking-[0.03em] text-cream">
            {store.mark}
          </p>
          <p className="font-brand text-sm italic text-cream/55">{store.submark}</p>
          <p className="mt-4 text-sm leading-relaxed text-cream/65">
            Квітковий магазин у {store.city}
          </p>
        </div>

        <div>
          <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-cream/45">
            Навігація
          </p>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li>
              <Link href="/catalog" className="transition-colors hover:text-cream">
                Каталог
              </Link>
            </li>
            <li>
              <Link href="/#delivery" className="transition-colors hover:text-cream">
                Доставка
              </Link>
            </li>
            <li>
              <Link href="/#contacts" className="transition-colors hover:text-cream">
                Контакти
              </Link>
            </li>
            <li>
              <Link href="/cart" className="transition-colors hover:text-cream">
                Кошик
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-cream/45">
            Категорії
          </p>
          <ul className="mt-4 space-y-2.5 text-sm">
            {categories.map((cat) => (
              <li key={cat.id}>
                <Link
                  href={`/catalog?category=${cat.id}`}
                  className="transition-colors hover:text-cream"
                >
                  {cat.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-cream/45">
            Контакти
          </p>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li className="text-cream/70">{store.address}</li>
            <li>
              <a
                href={`tel:${store.phoneTel}`}
                className="transition-colors hover:text-cream"
              >
                {store.phone}
              </a>
            </li>
            <li className="text-cream/70">{store.hours}</li>
            <li className="pt-2">
              <div className="flex items-center gap-3">
                <span className="text-sm text-cream/70">Ми в Instagram</span>
                <InstagramIconLink />
              </div>
            </li>
          </ul>
        </div>
      </Container>

      <div className="border-t border-cream/10">
        <Container className="py-5 text-center text-xs text-cream/45 sm:text-left">
          © {new Date().getFullYear()} {store.name}. Усі права захищені.
        </Container>
      </div>
    </footer>
  );
}
