import { cn } from "@/lib/cn";

type BadgeKind = "new" | "popular";

export function ProductBadge({ kind }: { kind: BadgeKind }) {
  return (
    <span
      className={cn(
        "inline-block rounded-sm border px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.12em] backdrop-blur-[2px]",
        kind === "new"
          ? "border-cream/60 bg-forest/75 text-cream/95"
          : "border-forest/10 bg-cream/90 text-forest/85",
      )}
    >
      {kind === "new" ? "Новинка" : "Популярне"}
    </span>
  );
}
