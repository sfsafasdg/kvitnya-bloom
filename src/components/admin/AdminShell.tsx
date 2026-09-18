"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

const links = [
  { href: "/admin", label: "Огляд", key: "home" },
  { href: "/admin/products", label: "Товари", key: "products" },
  { href: "/admin/orders", label: "Замовлення", key: "orders" },
  { href: "/admin/store", label: "Контакти", key: "store" },
];

export function AdminShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [newOrders, setNewOrders] = useState(0);
  const [orderAlert, setOrderAlert] = useState(false);
  const prevCount = useRef<number | null>(null);

  const pollOrders = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/orders/new-count", { cache: "no-store" });
      if (!res.ok) return;
      const data = (await res.json()) as { count?: number };
      const count = data.count ?? 0;
      setNewOrders(count);
      if (prevCount.current != null && count > prevCount.current) {
        setOrderAlert(true);
      }
      prevCount.current = count;
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    pollOrders();
    const id = window.setInterval(pollOrders, 12_000);
    return () => window.clearInterval(id);
  }, [pollOrders]);

  useEffect(() => {
    if (pathname.startsWith("/admin/orders")) {
      setOrderAlert(false);
    }
  }, [pathname]);

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  }

  return (
    <div className="min-h-screen bg-cream text-forest">
      {orderAlert && newOrders > 0 && !pathname.startsWith("/admin/orders") ? (
        <div className="border-b border-blush/30 bg-blush/10 px-4 py-3 sm:px-6">
          <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-between gap-2">
            <p className="text-sm font-medium text-forest">
              Нове замовлення на сайті
              {newOrders > 1 ? ` · ${newOrders} нових` : ""}
            </p>
            <Link
              href="/admin/orders"
              className="rounded-lg bg-blush px-4 py-1.5 text-sm font-semibold text-cream hover:bg-blush/90"
              onClick={() => setOrderAlert(false)}
            >
              Відкрити замовлення
            </Link>
          </div>
        </div>
      ) : null}

      <header className="border-b border-line bg-white">
        <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <div>
            <p className="font-brand text-xl tracking-wide text-forest">BLOOM</p>
            <p className="text-sm text-muted">Керування магазином</p>
          </div>
          <button
            type="button"
            onClick={logout}
            className="rounded-xl border border-line px-4 py-2 text-sm text-muted hover:border-forest/30 hover:text-forest"
          >
            Вийти
          </button>
        </div>
        <nav className="mx-auto flex max-w-4xl gap-1 overflow-x-auto px-4 pb-3 sm:px-6">
          {links.map((l) => {
            const active =
              l.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(l.href);
            const showBadge = l.key === "orders" && newOrders > 0;
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`relative shrink-0 rounded-xl px-4 py-2.5 text-sm font-medium transition-colors ${
                  active
                    ? "bg-forest text-cream"
                    : "bg-sand/60 text-forest hover:bg-sand"
                }`}
              >
                {l.label}
                {showBadge ? (
                  <span
                    className={`ml-1.5 inline-flex min-w-[1.25rem] items-center justify-center rounded-full px-1.5 py-0.5 text-[10px] font-bold leading-none ${
                      active ? "bg-cream text-blush" : "bg-blush text-cream"
                    }`}
                  >
                    {newOrders > 9 ? "9+" : newOrders}
                  </span>
                ) : null}
              </Link>
            );
          })}
        </nav>
      </header>
      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6">{children}</main>
    </div>
  );
}
