import type { SortKey } from "@/context/CatalogContext";

const options: { value: SortKey; label: string }[] = [
  { value: "newest", label: "Спочатку новіші" },
  { value: "price-asc", label: "Спочатку дешевші" },
  { value: "price-desc", label: "Спочатку дорожчі" },
];

export function SortSelect({
  value,
  onChange,
}: {
  value: SortKey;
  onChange: (v: SortKey) => void;
}) {
  return (
    <div className="flex items-center gap-2 rounded-lg border border-line bg-white px-3 py-1">
      <span className="shrink-0 text-xs font-medium text-muted">Сортувати:</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as SortKey)}
        className="max-w-[11rem] cursor-pointer border-0 bg-transparent py-2 pr-6 text-sm font-medium text-forest outline-none sm:max-w-none"
        aria-label="Сортування товарів"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}
