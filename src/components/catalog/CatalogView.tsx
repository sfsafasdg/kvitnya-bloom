"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { categories, getCategoryTitle } from "@/data/categories";
import { useCatalog, type SortKey } from "@/context/CatalogContext";
import type { CategoryId } from "@/lib/types";
import { ProductCard } from "@/components/product/ProductCard";
import { SortSelect } from "@/components/catalog/SortSelect";
import { cn } from "@/lib/cn";

function parseCategory(param: string | null): CategoryId {
  if (!param || param === "all") return "all";
  if (param === "new") return "new";
  if (categories.some((c) => c.id === param)) return param as CategoryId;
  return "all";
}

export function CatalogView() {
  const { products, filterProducts, sortProducts } = useCatalog();
  const searchParams = useSearchParams();
  const param = searchParams.get("category");

  const [category, setCategory] = useState<CategoryId>(() => parseCategory(param));
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [appliedMin, setAppliedMin] = useState<number | undefined>();
  const [appliedMax, setAppliedMax] = useState<number | undefined>();
  const [sort, setSort] = useState<SortKey>("newest");
  const [mobileFilters, setMobileFilters] = useState(false);

  useEffect(() => {
    setCategory(parseCategory(param));
  }, [param]);

  useEffect(() => {
    if (!mobileFilters) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileFilters(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [mobileFilters]);

  const filtered = useMemo(() => {
    const list = filterProducts(products, category, appliedMin, appliedMax);
    return sortProducts(list, sort);
  }, [category, appliedMin, appliedMax, sort]);

  const pageTitle = category === "all" ? "Повний каталог" : getCategoryTitle(category);

  function applyPriceFilter() {
    setAppliedMin(minPrice ? Number(minPrice) : undefined);
    setAppliedMax(maxPrice ? Number(maxPrice) : undefined);
    setMobileFilters(false);
  }

  const filters = (
    <div className="space-y-5">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-forest lg:sr-only">
        Фільтри
      </p>
      <FilterPanel title="Категорії">
        <ul className="space-y-1">
          <CategoryLink
            active={category === "all"}
            onClick={() => setCategory("all")}
            label="Усі букети"
          />
          {categories.map((c) => (
            <CategoryLink
              key={c.id}
              active={category === c.id}
              onClick={() => setCategory(c.id)}
              label={c.title}
            />
          ))}
        </ul>
      </FilterPanel>

      <FilterPanel title="Ціна">
        <div className="space-y-2">
          <label className="block text-xs text-muted">
            від
            <div className="relative mt-1">
              <input
                type="number"
                min={0}
                placeholder="0"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="w-full rounded-lg border border-line bg-white py-2.5 pl-3 pr-8 text-sm text-forest outline-none focus:border-forest/35"
              />
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted">
                ₴
              </span>
            </div>
          </label>
          <label className="block text-xs text-muted">
            до
            <div className="relative mt-1">
              <input
                type="number"
                min={0}
                placeholder="10000"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="w-full rounded-lg border border-line bg-white py-2.5 pl-3 pr-8 text-sm text-forest outline-none focus:border-forest/35"
              />
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted">
                ₴
              </span>
            </div>
          </label>
        </div>
        {(appliedMin != null || appliedMax != null) && (
          <p className="mt-2 text-xs text-muted">
            {appliedMin != null ? `від ${appliedMin} ₴` : ""}
            {appliedMin != null && appliedMax != null ? " · " : ""}
            {appliedMax != null ? `до ${appliedMax} ₴` : ""}
          </p>
        )}
        <button
          type="button"
          onClick={applyPriceFilter}
          className="mt-3 w-full rounded-lg border border-forest/15 bg-white py-2.5 text-sm font-medium text-forest transition-colors hover:bg-sand"
        >
          Застосувати
        </button>
      </FilterPanel>
    </div>
  );

  return (
    <div className="grid gap-8 lg:grid-cols-[240px_1fr]">
      <aside className="hidden lg:block">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-forest">
          Фільтри
        </p>
        {filters}
      </aside>

      {mobileFilters ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-forest/40"
            aria-label="Закрити фільтри"
            onClick={() => setMobileFilters(false)}
          />
          <div className="absolute bottom-0 left-0 right-0 max-h-[85vh] overflow-y-auto rounded-t-2xl border-t border-line bg-cream p-5 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <p className="font-medium text-forest">Фільтри</p>
              <button
                type="button"
                onClick={() => setMobileFilters(false)}
                className="rounded-lg px-2 py-1 text-sm text-muted"
              >
                Закрити
              </button>
            </div>
            {filters}
          </div>
        </div>
      ) : null}

      <div className="min-w-0">
        <div className="mb-6 flex flex-col gap-4 border-b border-line pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="font-display text-2xl font-normal text-forest sm:text-3xl">
              {pageTitle}
            </h1>
            <p className="mt-1 text-sm text-muted">
              {filtered.length}{" "}
              {filtered.length === 1 ? "товар" : filtered.length < 5 ? "товари" : "товарів"}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              className="rounded-lg border border-line bg-white px-4 py-2.5 text-sm font-medium text-forest lg:hidden"
              onClick={() => setMobileFilters(true)}
            >
              Фільтри
            </button>
            <SortSelect value={sort} onChange={setSort} />
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-line bg-sand/50 px-6 py-16 text-center">
            <p className="font-display text-xl text-forest">Нічого не знайдено</p>
            <p className="mt-2 text-sm text-muted">
              Спробуйте змінити категорію або діапазон цін.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-6 xl:grid-cols-3 2xl:grid-cols-4">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function FilterPanel({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-line bg-white p-4">
      <h2 className="text-[11px] font-semibold uppercase tracking-[0.12em] text-forest">
        {title}
      </h2>
      <div className="mt-3">{children}</div>
    </div>
  );
}

function CategoryLink({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <li>
      <button
        type="button"
        onClick={onClick}
        className={cn(
          "w-full rounded-lg px-2.5 py-2 text-left text-sm transition-colors",
          active
            ? "bg-sand font-medium text-forest"
            : "text-muted hover:bg-sand/60 hover:text-forest",
        )}
      >
        {label}
      </button>
    </li>
  );
}
