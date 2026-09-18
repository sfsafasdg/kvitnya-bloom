"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { formatPrice } from "@/lib/format";
import type { OrderRow } from "@/lib/admin-sanity";

const statusLabels: Record<string, string> = {
  new: "Нове",
  in_progress: "В роботі",
  done: "Виконано",
  cancelled: "Скасовано",
};

const deliveryLabels: Record<string, string> = {
  courier: "Доставка курʼєром",
  pickup: "Самовивіз зі студії",
};

function formatPlacedAt(iso?: string): string | null {
  if (!iso) return null;
  try {
    return new Date(iso).toLocaleString("uk-UA", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return null;
  }
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[6.25rem_1fr] items-baseline gap-x-3 gap-y-0.5 sm:grid-cols-[7.5rem_1fr]">
      <span className="text-sm text-muted">{label}</span>
      <div className="min-w-0 text-sm font-medium text-forest">{children}</div>
    </div>
  );
}

export function OrdersList({ orders: initial }: { orders: OrderRow[] }) {
  const router = useRouter();
  const [orders, setOrders] = useState(initial);
  const [busyId, setBusyId] = useState<string | null>(null);

  useEffect(() => {
    setOrders(initial);
  }, [initial]);

  async function setStatus(id: string, status: string) {
    setOrders((list) => list.map((o) => (o._id === id ? { ...o, status } : o)));
    setBusyId(id);
    const res = await fetch(`/api/admin/orders/${encodeURIComponent(id)}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    setBusyId(null);
    if (!res.ok) setOrders(initial);
    else router.refresh();
  }

  async function remove(id: string, label: string) {
    if (!confirm(`Видалити замовлення ${label}?`)) return;
    setBusyId(id);
    const res = await fetch(`/api/admin/orders/${encodeURIComponent(id)}`, {
      method: "DELETE",
    });
    setBusyId(null);
    if (res.ok) {
      setOrders((list) => list.filter((o) => o._id !== id));
      router.refresh();
    }
  }

  if (orders.length === 0) {
    return (
      <p className="rounded-2xl border border-dashed border-line bg-white p-10 text-center text-muted">
        Активних замовлень немає.
      </p>
    );
  }

  return (
    <ul className="space-y-4">
      {orders.map((o) => {
        const placed = formatPlacedAt(o.placedAt);
        const when =
          o.deliveryDate &&
          `${o.deliveryDate}${o.deliveryTime ? ` о ${o.deliveryTime}` : ""}`;

        return (
          <li
            key={o._id}
            className="overflow-hidden rounded-2xl border border-line bg-white shadow-sm"
          >
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line bg-sand/30 px-4 py-3 sm:px-5">
              <p className="text-sm text-muted">
                Замовлення{" "}
                <span className="font-medium text-forest">{o.orderNumber ?? "—"}</span>
              </p>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted">Статус:</span>
                <select
                  disabled={busyId === o._id}
                  value={o.status ?? "new"}
                  onChange={(e) => setStatus(o._id, e.target.value)}
                  className="rounded-lg border border-line bg-white px-2.5 py-1.5 text-sm font-medium"
                >
                  {Object.entries(statusLabels).map(([v, label]) => (
                    <option key={v} value={v}>
                      {label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-2.5 px-4 py-4 sm:px-5">
              <Row label="Імʼя">{o.customerName?.trim() || "—"}</Row>

              <Row label="Телефон">
                {o.phone ? (
                  <a
                    href={`tel:${o.phone.replace(/\s/g, "")}`}
                    className="text-base font-semibold tabular-nums text-blush hover:underline"
                  >
                    {o.phone}
                  </a>
                ) : (
                  "—"
                )}
              </Row>

              <Row label="На коли">{when || "—"}</Row>

              <Row label="Сума">
                {o.subtotal != null ? (
                  <span className="font-display text-lg text-forest">{formatPrice(o.subtotal)}</span>
                ) : (
                  "—"
                )}
              </Row>

              <Row label="Отримання">
                {deliveryLabels[o.deliveryMethod ?? ""] ?? "—"}
              </Row>

              {o.deliveryMethod === "courier" && o.address?.trim() ? (
                <Row label="Адреса">{o.address.trim()}</Row>
              ) : null}

              {o.lines && o.lines.length > 0 ? (
                <Row label="Товари">
                  <ul className="space-y-1 font-normal">
                    {o.lines.map((line, i) => (
                      <li key={i} className="flex flex-wrap justify-between gap-x-2">
                        <span>
                          {line.productName ?? "Товар"}
                          {line.quantity != null ? ` × ${line.quantity}` : ""}
                        </span>
                        {line.unitPrice != null ? (
                          <span className="tabular-nums text-muted">
                            {formatPrice(line.unitPrice * (line.quantity ?? 1))}
                          </span>
                        ) : null}
                      </li>
                    ))}
                  </ul>
                </Row>
              ) : null}

              {o.comment?.trim() ? <Row label="Коментар">{o.comment.trim()}</Row> : null}

              {placed ? (
                <Row label="Надіслано">
                  <span className="font-normal text-muted">{placed}</span>
                </Row>
              ) : null}
            </div>

            <div className="border-t border-line px-4 py-2.5 sm:px-5">
              <button
                type="button"
                disabled={busyId === o._id}
                onClick={() => remove(o._id, o.orderNumber ?? o.phone ?? "")}
                className="text-xs text-muted hover:text-blush hover:underline disabled:opacity-50"
              >
                Видалити замовлення
              </button>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
