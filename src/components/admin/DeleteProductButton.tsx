"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function DeleteProductButton({
  sanityId,
  name,
}: {
  sanityId: string;
  name: string;
}) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function remove() {
    if (!confirm(`Видалити «${name}» з сайту?`)) return;
    setBusy(true);
    await fetch(`/api/admin/products/${encodeURIComponent(sanityId)}`, {
      method: "DELETE",
    });
    router.push("/admin/products");
  }

  return (
    <button
      type="button"
      disabled={busy}
      onClick={remove}
      className="text-sm text-blush underline-offset-2 hover:underline disabled:opacity-50"
    >
      {busy ? "Видаляємо…" : "Видалити цей товар"}
    </button>
  );
}
