import { notFound } from "next/navigation";
import { ProductForm } from "@/components/admin/ProductForm";
import { DeleteProductButton } from "@/components/admin/DeleteProductButton";
import { adminGetProduct } from "@/lib/admin-sanity";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ created?: string }>;
};

export default async function AdminEditProductPage({ params, searchParams }: Props) {
  const { id } = await params;
  const { created } = await searchParams;
  const product = await adminGetProduct(id);
  if (!product) notFound();

  return (
    <div>
      <ProductForm mode="edit" product={product} justCreated={created === "1"} />
      <div className="mt-10 border-t border-line pt-8">
        <DeleteProductButton sanityId={product.sanityId} name={product.name} />
      </div>
    </div>
  );
}
