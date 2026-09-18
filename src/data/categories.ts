import type { CategoryId } from "@/lib/types";

export type Category = {
  id: Exclude<CategoryId, "all">;
  title: string;
};

export const categories: Category[] = [
  { id: "bouquets", title: "Букети" },
  { id: "roses", title: "Троянди" },
  { id: "author", title: "Авторські букети" },
  { id: "compositions", title: "Композиції" },
  { id: "gifts", title: "Подарунки" },
  { id: "new", title: "Новинки" },
];

export function getCategoryTitle(id: CategoryId): string {
  if (id === "all") return "Усі товари";
  return categories.find((c) => c.id === id)?.title ?? id;
}
