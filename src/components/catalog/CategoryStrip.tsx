"use client";

import { categories } from "@/data/categories";
import type { CategoryId } from "@/lib/types";
import { cn } from "@/lib/cn";

type Props = {
  active: CategoryId;
  onSelect: (id: CategoryId) => void;
  className?: string;
};

export function CategoryStrip({ active, onSelect, className }: Props) {
  return (
    <div
      id="categories"
      className={cn(
        "scroll-mt-20 border-b border-line bg-cream/95 backdrop-blur-sm",
        className,
      )}
    >
      <div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-4 py-3 scrollbar-none sm:px-6 lg:px-8">
        <CategoryChip
          label="Усі"
          active={active === "all"}
          onClick={() => onSelect("all")}
        />
        {categories.map((cat) => (
          <CategoryChip
            key={cat.id}
            label={cat.title}
            active={active === cat.id}
            onClick={() => onSelect(cat.id)}
          />
        ))}
      </div>
    </div>
  );
}

function CategoryChip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "shrink-0 rounded-lg border px-3.5 py-2 text-sm font-medium transition-colors duration-200",
        active
          ? "border-forest bg-forest text-cream"
          : "border-line bg-white text-muted hover:border-forest/25 hover:text-forest",
      )}
    >
      {label}
    </button>
  );
}
