import { cn } from "@/lib/cn";

type BadgeKind = "new" | "popular" | "promo";

const labels: Record<BadgeKind, string> = {
  new: "Новинка",
  popular: "Популярне",
  promo: "Акція",
};

export function ProductBadge({ kind }: { kind: BadgeKind }) {
  return (
    <span
      className={cn(
        "inline-block rounded-sm border px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.12em] backdrop-blur-[2px]",
        kind === "new"
          ? "border-cream/60 bg-forest/75 text-cream/95"
          : kind === "promo"
            ? "border-blush/40 bg-blush/90 text-cream"
            : "border-forest/10 bg-cream/90 text-forest/85",
      )}
    >
      {labels[kind]}
    </span>
  );
}
