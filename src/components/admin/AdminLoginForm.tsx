"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export function AdminLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const setupMissing = searchParams.get("setup") === "missing";
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    setBusy(false);
    if (!res.ok) {
      const data = (await res.json()) as { error?: string };
      setError(data.error ?? "Невірний пароль");
      return;
    }
    router.push("/admin");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-cream px-4">
      <form
        onSubmit={submit}
        className="w-full max-w-md rounded-3xl border border-line bg-white p-8 shadow-sm"
      >
        <p className="font-brand text-2xl text-forest">BLOOM</p>
        <h1 className="mt-2 font-display text-3xl text-forest">Вхід</h1>
        <p className="mt-2 text-sm text-muted">Обліковий запис адміністратора магазину.</p>
        {setupMissing ? (
          <p className="mt-4 rounded-xl border border-blush/30 bg-blush/5 px-4 py-3 text-sm text-forest">
            На сервері не задано пароль адмінки. У Vercel → Environment Variables додайте{" "}
            <strong>ADMIN_PASSWORD</strong>, потім <strong>Redeploy</strong>.
          </p>
        ) : null}
        <label className="mt-8 block">
          <span className="text-sm font-semibold text-forest">Пароль</span>
          <input
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-2 w-full rounded-xl border border-line px-4 py-3.5 text-lg outline-none focus:border-forest/40"
          />
        </label>
        {error ? <p className="mt-3 text-sm text-blush">{error}</p> : null}
        <button
          type="submit"
          disabled={busy}
          className="mt-6 w-full rounded-2xl bg-forest py-4 text-base font-semibold text-cream hover:bg-forest/90 disabled:opacity-60"
        >
          {busy ? "Зачекайте…" : "Увійти"}
        </button>
      </form>
    </div>
  );
}
