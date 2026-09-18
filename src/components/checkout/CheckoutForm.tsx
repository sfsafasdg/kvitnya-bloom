"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { getProductById, getProductPrice } from "@/data/products";
import { formatPrice } from "@/lib/format";
import type { DeliveryMethod } from "@/lib/types";
import { Button } from "@/components/ui/Button";
import { store } from "@/data/store";

export function CheckoutForm() {
  const { lines, subtotal, clearCart } = useCart();
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod>("courier");
  const [address, setAddress] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [comment, setComment] = useState("");

  if (lines.length === 0 && !submitted) {
    return (
      <div className="rounded-3xl border border-dashed border-line bg-sand/40 px-6 py-20 text-center">
        <p className="font-display text-2xl text-forest">Немає товарів для оформлення</p>
        <Button href="/catalog" className="mt-8">
          До каталогу
        </Button>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="mx-auto max-w-lg rounded-3xl border border-line bg-white px-8 py-16 text-center">
        <p className="font-display text-3xl text-forest">Дякуємо за замовлення!</p>
        <p className="mt-4 text-muted">
          Це демо-концепт: заявку не відправлено на сервер. Менеджер звʼязався б з вами за
          номером {phone || "—"} для підтвердження.
        </p>
        <Button href="/" className="mt-8">
          На головну
        </Button>
      </div>
    );
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
    clearCart();
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-10 lg:grid-cols-[1fr_360px]">
      <div className="space-y-8">
        <fieldset className="rounded-2xl border border-line bg-white p-6">
          <legend className="px-1 font-display text-xl text-forest">Контактні дані</legend>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <label className="block sm:col-span-2">
              <span className="text-sm font-medium text-forest">Імʼя</span>
              <input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-line px-4 py-3 text-sm outline-none focus:border-forest/40"
                placeholder="Ваше імʼя"
              />
            </label>
            <label className="block sm:col-span-2">
              <span className="text-sm font-medium text-forest">Телефон</span>
              <input
                required
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-line px-4 py-3 text-sm outline-none focus:border-forest/40"
                placeholder="+38 (0__) ___-__-__"
              />
            </label>
          </div>
        </fieldset>

        <fieldset className="rounded-2xl border border-line bg-white p-6">
          <legend className="px-1 font-display text-xl text-forest">Отримання</legend>
          <div className="mt-4 flex flex-wrap gap-3">
            {(
              [
                ["courier", "Доставка курʼєром"],
                ["pickup", "Самовивіз зі студії"],
              ] as const
            ).map(([value, label]) => (
              <button
                key={value}
                type="button"
                onClick={() => setDeliveryMethod(value)}
                className={`rounded-full border px-4 py-2 text-sm transition-all ${
                  deliveryMethod === value
                    ? "border-forest bg-forest text-cream"
                    : "border-line bg-cream text-forest hover:border-forest/30"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {deliveryMethod === "courier" ? (
            <label className="mt-4 block">
              <span className="text-sm font-medium text-forest">Адреса доставки</span>
              <input
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-line px-4 py-3 text-sm outline-none focus:border-forest/40"
                placeholder="Вулиця, будинок, підʼїзд, поверх"
              />
            </label>
          ) : (
            <p className="mt-4 text-sm text-muted">
              {store.address} — {store.hours}
            </p>
          )}

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="text-sm font-medium text-forest">Дата</span>
              <input
                required
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-line px-4 py-3 text-sm outline-none focus:border-forest/40"
              />
            </label>
            <label className="block">
              <span className="text-sm font-medium text-forest">Час</span>
              <input
                required
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-line px-4 py-3 text-sm outline-none focus:border-forest/40"
              />
            </label>
          </div>

          <label className="mt-4 block">
            <span className="text-sm font-medium text-forest">Коментар до замовлення</span>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={3}
              className="mt-1.5 w-full resize-y rounded-xl border border-line px-4 py-3 text-sm outline-none focus:border-forest/40"
              placeholder="Текст листівки, анонімна доставка, побажання…"
            />
          </label>
        </fieldset>
      </div>

      <aside className="h-fit rounded-2xl border border-line bg-white p-6 lg:sticky lg:top-24">
        <h2 className="font-display text-xl text-forest">Ваше замовлення</h2>
        <ul className="mt-4 max-h-64 space-y-3 overflow-y-auto text-sm">
          {lines.map((line) => {
            const product = getProductById(line.productId);
            if (!product) return null;
            const price = getProductPrice(product, line.sizeId);
            return (
              <li key={`${line.productId}-${line.sizeId ?? "d"}`} className="flex justify-between gap-2">
                <span className="text-muted">
                  {product.name} × {line.quantity}
                </span>
                <span className="shrink-0 font-medium text-forest">
                  {formatPrice(price * line.quantity)}
                </span>
              </li>
            );
          })}
        </ul>
        <div className="mt-4 flex justify-between border-t border-line pt-4 font-semibold text-forest">
          <span>Разом</span>
          <span>{formatPrice(subtotal)}</span>
        </div>
        <Button type="submit" className="mt-6 w-full">
          Підтвердити замовлення
        </Button>
        <Link href="/cart" className="mt-4 block text-center text-sm text-muted hover:text-blush">
          Повернутись до кошика
        </Link>
        <p className="mt-4 text-xs leading-relaxed text-muted">
          Натискаючи кнопку, ви погоджуєтесь з умовами обробки даних (демо-версія).
        </p>
      </aside>
    </form>
  );
}
