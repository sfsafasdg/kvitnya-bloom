import { OrdersList } from "@/components/admin/OrdersList";
import { adminListOrders } from "@/lib/admin-sanity";

export default async function AdminOrdersPage() {
  const orders = await adminListOrders();
  return (
    <div>
      <h1 className="font-display text-3xl text-forest">Замовлення</h1>
      <p className="mt-2 text-sm text-muted">Заявки, оформлені на сайті.</p>
      <div className="mt-8">
        <OrdersList orders={orders} />
      </div>
    </div>
  );
}
