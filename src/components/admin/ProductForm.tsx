"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { categories } from "@/data/categories";
import type { AdminProduct } from "@/lib/admin-sanity";
import type { Product } from "@/lib/types";

const productCategories = categories.filter((c) => c.id !== "new");

type Props = {
  mode: "create" | "edit";
  product?: AdminProduct;
};

export function ProductForm({ mode, product }: Props) {
  const router = useRouter();
  const [name, setName] = useState(product?.name ?? "");
  const [price, setPrice] = useState(String(product?.price ?? ""));
  const [compareAt, setCompareAt] = useState(
    product?.compareAtPrice ? String(product.compareAtPrice) : "",
  );
  const [categoryId, setCategoryId] = useState<Product["categoryId"]>(
    product?.categoryId ?? "bouquets",
  );
  const [description, setDescription] = useState(product?.description ?? "");
  const [composition, setComposition] = useState(product?.composition ?? "");
  const [isNew, setIsNew] = useState(product?.isNew ?? false);
  const [isPopular, setIsPopular] = useState(product?.isPopular ?? false);
  const [isPromo, setIsPromo] = useState(product?.isPromo ?? false);
  const [preview, setPreview] = useState(product?.image ?? "");
  const [imageAssetId, setImageAssetId] = useState<string | undefined>();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setBusy(true);
    setError(null);
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
    const data = (await res.json()) as { assetId?: string; error?: string };
    setBusy(false);
    if (!res.ok) {
      setError(data.error ?? "Помилка фото");
      return;
    }
    setImageAssetId(data.assetId);
    setPreview(URL.createObjectURL(file));
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    const priceNum = Number(price);
    if (!name.trim() || !priceNum) {
      setError("Вкажіть назву і ціну");
      return;
    }
    setBusy(true);
    const payload = {
      name,
      price: priceNum,
      compareAtPrice: compareAt ? Number(compareAt) : undefined,
      categoryId,
      description,
      composition,
      isNew,
      isPopular,
      isPromo,
      imageAssetId,
    };
    const url =
      mode === "edit" && product
        ? `/api/admin/products/${encodeURIComponent(product.sanityId)}`
        : "/api/admin/products";
    const res = await fetch(url, {
      method: mode === "edit" ? "PATCH" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    setBusy(false);
    if (!res.ok) {
      const data = (await res.json()) as { error?: string };
      setError(data.error ?? "Не збережено");
      return;
    }
    router.push("/admin/products");
    router.refresh();
  }

  return (
    <form onSubmit={submit} className="space-y-6">
      <section className="rounded-2xl border border-line bg-white p-6 shadow-sm">
        <h2 className="font-display text-2xl text-forest">
          {mode === "create" ? "Новий товар" : "Редагувати товар"}
        </h2>
        <p className="mt-1 text-sm text-muted">Обовʼязкові поля позначені зірочкою.</p>

        <label className="mt-6 block">
          <span className="text-sm font-semibold text-forest">Назва букета *</span>
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-2 w-full rounded-xl border border-line px-4 py-3.5 text-base outline-none focus:border-forest/40"
            placeholder="Букет «Ніжність»"
          />
        </label>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="text-sm font-semibold text-forest">Ціна, ₴ *</span>
            <input
              required
              type="number"
              min={0}
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="mt-2 w-full rounded-xl border border-line px-4 py-3.5 text-base outline-none focus:border-forest/40"
            />
          </label>
          <label className="block">
            <span className="text-sm font-semibold text-forest">Стара ціна (акція)</span>
            <input
              type="number"
              min={0}
              value={compareAt}
              onChange={(e) => setCompareAt(e.target.value)}
              className="mt-2 w-full rounded-xl border border-line px-4 py-3.5 text-base outline-none focus:border-forest/40"
              placeholder="Не обовʼязково"
            />
          </label>
        </div>

        <label className="mt-4 block">
          <span className="text-sm font-semibold text-forest">Категорія</span>
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value as Product["categoryId"])}
            className="mt-2 w-full rounded-xl border border-line bg-white px-4 py-3.5 text-base outline-none focus:border-forest/40"
          >
            {productCategories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.title}
              </option>
            ))}
          </select>
        </label>

        <div className="mt-6 flex flex-wrap gap-4 text-sm">
          <label className="flex cursor-pointer items-center gap-2">
            <input type="checkbox" checked={isPromo} onChange={(e) => setIsPromo(e.target.checked)} />
            Акція
          </label>
          <label className="flex cursor-pointer items-center gap-2">
            <input type="checkbox" checked={isNew} onChange={(e) => setIsNew(e.target.checked)} />
            Новинка
          </label>
          <label className="flex cursor-pointer items-center gap-2">
            <input
              type="checkbox"
              checked={isPopular}
              onChange={(e) => setIsPopular(e.target.checked)}
            />
            Показувати в «Популярні»
          </label>
        </div>
      </section>

      <section className="rounded-2xl border border-line bg-white p-6 shadow-sm">
        <span className="text-sm font-semibold text-forest">Фото</span>
        <p className="mt-1 text-sm text-muted">Формат JPG або PNG.</p>
        {preview ? (
          <div className="relative mt-4 aspect-[4/5] max-w-xs overflow-hidden rounded-xl bg-sand">
            <Image src={preview} alt="" fill className="object-cover" unoptimized />
          </div>
        ) : null}
        <input
          type="file"
          accept="image/*"
          onChange={onFile}
          className="mt-4 block w-full text-sm"
        />
      </section>

      <section className="rounded-2xl border border-line bg-white p-6 shadow-sm">
        <label className="block">
          <span className="text-sm font-semibold text-forest">Короткий опис</span>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="mt-2 w-full rounded-xl border border-line px-4 py-3 text-base outline-none focus:border-forest/40"
            placeholder="Для кого підійде, нагода…"
          />
        </label>
        <label className="mt-4 block">
          <span className="text-sm font-semibold text-forest">Склад (квіти)</span>
          <input
            value={composition}
            onChange={(e) => setComposition(e.target.value)}
            className="mt-2 w-full rounded-xl border border-line px-4 py-3 text-base outline-none focus:border-forest/40"
            placeholder="Троянди, еустома…"
          />
        </label>
      </section>

      {error ? <p className="text-sm font-medium text-blush">{error}</p> : null}

      <button
        type="submit"
        disabled={busy}
        className="w-full rounded-2xl bg-forest py-4 text-base font-semibold text-cream transition hover:bg-forest/90 disabled:opacity-60 sm:w-auto sm:px-12"
      >
        {busy ? "Зберігаємо…" : "Зберегти"}
      </button>
    </form>
  );
}
