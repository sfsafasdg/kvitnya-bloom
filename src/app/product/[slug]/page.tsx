import { notFound } from "next/navigation";
import { getProductBySlug, products } from "@/data/products";
import { ProductPageClient } from "@/components/product/ProductPageClient";
import { Container } from "@/components/ui/Container";
import type { Metadata } from "next";

type Props = PageProps<"/product/[slug]">;

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "Товар не знайдено" };
  return {
    title: product.name,
    description: product.description,
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  return (
    <div className="bg-cream py-10 sm:py-14">
      <Container>
        <ProductPageClient product={product} />
      </Container>
    </div>
  );
}
