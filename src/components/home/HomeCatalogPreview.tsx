import Link from "next/link";
import { categories } from "@/data/categories";
import { products } from "@/data/products";
import { ProductCard } from "@/components/product/ProductCard";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

function getFeaturedProducts() {
  const popular = products.filter((p) => p.isPopular);
  const rest = products.filter((p) => !p.isPopular);
  return [...popular, ...rest].slice(0, 8);
}

export function HomeCatalogPreview() {
  const featured = getFeaturedProducts();

  return (
    <>
      <div
        id="categories"
        className="scroll-mt-[4.5rem] border-b border-line bg-cream/95"
      >
        <Container className="flex gap-2 overflow-x-auto py-3 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <Link
            href="/catalog"
            className="shrink-0 rounded-lg border border-line bg-white px-3.5 py-2 text-sm font-medium text-muted transition-colors hover:border-forest/25 hover:text-forest"
          >
            Усі
          </Link>
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/catalog?category=${cat.id}`}
              className="shrink-0 rounded-lg border border-line bg-white px-3.5 py-2 text-sm font-medium text-muted transition-colors hover:border-forest/25 hover:text-forest"
            >
              {cat.title}
            </Link>
          ))}
        </Container>
      </div>

      <section id="featured" className="bg-cream pb-12 pt-8 sm:pb-14 sm:pt-10">
        <Container>
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="font-display text-2xl font-normal text-forest sm:text-[1.75rem]">
                Популярні букети
              </h1>
              <p className="mt-1 text-sm text-muted">
                Обрані композиції Bloom Flowers — повний асортимент у каталозі
              </p>
            </div>
            <Button href="/catalog" variant="outline" className="shrink-0">
              Повний каталог
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-6 lg:grid-cols-4">
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="mt-10 flex justify-center sm:justify-start">
            <Button href="/catalog">Переглянути весь каталог</Button>
          </div>
        </Container>
      </section>
    </>
  );
}
