import { defineField, defineType } from "sanity";

export const order = defineType({
  name: "order",
  title: "Замовлення",
  type: "document",
  fields: [
    defineField({
      name: "orderNumber",
      title: "№ замовлення",
      type: "string",
      readOnly: true,
    }),
    defineField({
      name: "status",
      title: "Статус",
      type: "string",
      options: {
        list: [
          { title: "Нове", value: "new" },
          { title: "В роботі", value: "in_progress" },
          { title: "Виконано", value: "done" },
          { title: "Скасовано", value: "cancelled" },
        ],
      },
      initialValue: "new",
    }),
    defineField({
      name: "customerName",
      title: "Імʼя клієнта",
      type: "string",
    }),
    defineField({
      name: "phone",
      title: "Телефон",
      type: "string",
    }),
    defineField({
      name: "deliveryMethod",
      title: "Доставка",
      type: "string",
      options: {
        list: [
          { title: "Курʼєром", value: "courier" },
          { title: "Самовивіз", value: "pickup" },
        ],
      },
    }),
    defineField({ name: "address", title: "Адреса", type: "string" }),
    defineField({ name: "deliveryDate", title: "Дата", type: "string" }),
    defineField({ name: "deliveryTime", title: "Час", type: "string" }),
    defineField({ name: "comment", title: "Коментар", type: "text", rows: 3 }),
    defineField({
      name: "lines",
      title: "Товари",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "productId", title: "ID товару", type: "string" },
            { name: "productName", title: "Назва", type: "string" },
            { name: "quantity", title: "Кількість", type: "number" },
            { name: "unitPrice", title: "Ціна за од.", type: "number" },
            { name: "sizeLabel", title: "Розмір", type: "string" },
          ],
        },
      ],
    }),
    defineField({ name: "subtotal", title: "Сума, ₴", type: "number" }),
    defineField({
      name: "placedAt",
      title: "Час замовлення",
      type: "datetime",
      readOnly: true,
    }),
  ],
  orderings: [
    {
      title: "Нові зверху",
      name: "placedAtDesc",
      by: [{ field: "placedAt", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      orderNumber: "orderNumber",
      phone: "phone",
      status: "status",
      subtotal: "subtotal",
    },
    prepare({ orderNumber, phone, status, subtotal }) {
      return {
        title: orderNumber || "Замовлення",
        subtitle: [phone, status, subtotal != null ? `${subtotal} ₴` : null]
          .filter(Boolean)
          .join(" · "),
      };
    },
  },
});
