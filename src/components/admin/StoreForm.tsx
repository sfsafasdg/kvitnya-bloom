"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { StoreSettings } from "@/lib/catalog";

export function StoreForm({ initial }: { initial: StoreSettings }) {
  const router = useRouter();
  const [form, setForm] = useState(initial);
  const [busy, setBusy] = useState(false);
  const [ok, setOk] = useState(false);

  function set<K extends keyof StoreSettings>(key: K, value: StoreSettings[K]) {
    setForm((f) => ({ ...f, [key]: value }));
    setOk(false);
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    const res = await fetch("/api/admin/store", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setBusy(false);
    if (res.ok) {
      setOk(true);
      router.refresh();
    }
  }

  const fields: { key: keyof StoreSettings; label: string; hint?: string }[] = [
    { key: "phone", label: "Телефон (як на сайті)" },
    { key: "phoneTel", label: "Телефон для дзвінка", hint: "Без пробілів, напр. +380987339695" },
    { key: "address", label: "Адреса" },
    { key: "hours", label: "Години роботи" },
    { key: "instagram", label: "Посилання Instagram" },
    { key: "city", label: "Місто" },
  ];

  return (
    <form onSubmit={submit} className="space-y-4 rounded-2xl border border-line bg-white p-6 shadow-sm">
      <h2 className="font-display text-2xl text-forest">Контакти магазину</h2>
      <p className="text-sm text-muted">Телефон, адреса та Instagram на сайті.</p>
      {fields.map((f) => (
        <label key={f.key} className="block">
          <span className="text-sm font-semibold text-forest">{f.label}</span>
          {f.hint ? <span className="ml-2 text-xs text-muted">{f.hint}</span> : null}
          <input
            value={form[f.key]}
            onChange={(e) => set(f.key, e.target.value)}
            className="mt-2 w-full rounded-xl border border-line px-4 py-3.5 text-base outline-none focus:border-forest/40"
          />
        </label>
      ))}
      {ok ? <p className="text-sm font-medium text-forest">Збережено ✓</p> : null}
      <button
        type="submit"
        disabled={busy}
        className="rounded-2xl bg-forest px-10 py-3.5 text-base font-semibold text-cream hover:bg-forest/90 disabled:opacity-60"
      >
        {busy ? "Зберігаємо…" : "Зберегти"}
      </button>
    </form>
  );
}
