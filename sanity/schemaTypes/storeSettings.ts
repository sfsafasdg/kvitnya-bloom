import { defineField, defineType } from "sanity";

export const storeSettings = defineType({
  name: "storeSettings",
  title: "Налаштування магазину",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Назва", type: "string" }),
    defineField({ name: "mark", title: "Логотип (рядок 1)", type: "string" }),
    defineField({ name: "submark", title: "Підпис (рядок 2)", type: "string" }),
    defineField({ name: "address", title: "Адреса", type: "string" }),
    defineField({ name: "phone", title: "Телефон (як показувати)", type: "string" }),
    defineField({ name: "phoneTel", title: "Телефон для tel:", type: "string" }),
    defineField({ name: "hours", title: "Години роботи", type: "string" }),
    defineField({ name: "city", title: "Місто", type: "string" }),
    defineField({ name: "instagram", title: "Instagram URL", type: "url" }),
    defineField({
      name: "instagramHandle",
      title: "Instagram @",
      type: "string",
    }),
  ],
  preview: {
    prepare() {
      return { title: "Магазин Bloom" };
    },
  },
});
