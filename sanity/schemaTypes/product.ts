import { defineField, defineType } from "sanity";

export const product = defineType({
  name: "product",
  title: "Товар",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Назва",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug (URL)",
      type: "slug",
      options: { source: "name", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "legacyId",
      title: "ID (для кошика, напр. p1)",
      type: "string",
    }),
    defineField({
      name: "price",
      title: "Ціна, ₴",
      type: "number",
      validation: (r) => r.required().min(0),
    }),
    defineField({
      name: "compareAtPrice",
      title: "Стара ціна (акція)",
      type: "number",
      description: "Якщо більша за поточну — показується закресленою",
    }),
    defineField({
      name: "categoryId",
      title: "Категорія",
      type: "string",
      options: {
        list: [
          { title: "Букети", value: "bouquets" },
          { title: "Троянди", value: "roses" },
          { title: "Авторські", value: "author" },
          { title: "Композиції", value: "compositions" },
          { title: "Подарунки", value: "gifts" },
        ],
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "description",
      title: "Опис",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "composition",
      title: "Склад",
      type: "string",
    }),
    defineField({
      name: "image",
      title: "Головне фото",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "legacyImagePath",
      title: "Або шлях на сайті (якщо без завантаження)",
      type: "string",
      description: "Наприклад /products/bloom-01.png",
    }),
    defineField({
      name: "gallery",
      title: "Додаткові фото",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
    }),
    defineField({
      name: "isNew",
      title: "Новинка",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "isPopular",
      title: "Популярне",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "isPromo",
      title: "Акція",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "createdAt",
      title: "Дата (для сортування)",
      type: "date",
    }),
    defineField({
      name: "sizes",
      title: "Розміри",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "id", title: "ID", type: "string" },
            { name: "label", title: "Назва", type: "string" },
            { name: "priceModifier", title: "Доплата, ₴", type: "number" },
          ],
        },
      ],
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "price", media: "image" },
    prepare({ title, subtitle, media }) {
      return {
        title,
        subtitle: subtitle != null ? `${subtitle} ₴` : undefined,
        media,
      };
    },
  },
});
