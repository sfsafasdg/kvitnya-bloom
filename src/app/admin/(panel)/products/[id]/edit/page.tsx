import { notFound } from "next/navigation";
import { ProductForm } from "@/components/admin/ProductForm";
import { DeleteProductButton } from "@/components/admin/DeleteProductButton";
import { adminGetProduct } from "@/lib/admin-sanity";

type Props = { params: Promise<{ id: string }> };

export default async function AdminEditProductPage({ params }: Props) {
  const { id } = await params;
  const product = await adminGetProduct(id);
  if (!product) notFound();

  return (
    <div>
      <ProductForm mode="edit" product={product} />
      <div className="mt-10 border-t border-line pt-8">
        <DeleteProductButton sanityId={product.sanityId} name={product.name} />
      </div>
    </div>
  );
}
