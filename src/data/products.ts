import type { Product } from "@/lib/types";

const photo = (file: string) => `/products/${file}`;

export const products: Product[] = [
  {
    id: "p1",
    slug: "buket-nizhnist",
    name: "Букет «Ніжність»",
    price: 1400,
    categoryId: "bouquets",
    description:
      "Пастельні троянди, еустома та еucalyptus у рожевому оформленні — для побачення чи подяки.",
    composition: "Троянди, еустома, еucalyptus, упаковка рожева",
    image: photo("bloom-02.png"),
    images: [photo("bloom-02.png")],
    isPopular: true,
    createdAt: "2026-03-14",
  },
  {
    id: "p2",
    slug: "kompozyciya-bloom-box",
    name: "Композиція в боксі «Bloom»",
    price: 1500,
    categoryId: "compositions",
    description:
      "Обʼємна композиція в рожевій шляпній коробці з атласною стрічкою.",
    composition: "Троянди, хриzanthemum, гортензія, бавовна, еucalyptus",
    image: photo("bloom-01.png"),
    images: [photo("bloom-01.png")],
    isPopular: true,
    createdAt: "2026-03-12",
  },
  {
    id: "p3",
    slug: "trojandy-venetsiya",
    name: "Троянди «Венеція»",
    price: 1200,
    categoryId: "roses",
    description: "Насичені червоні троянди в білому оформленні — класика, що завжди доречна.",
    composition: "15–17 червоних троянд, упаковка біла, стрічка",
    image: photo("bloom-09.png"),
    images: [photo("bloom-09.png")],
    isPopular: true,
    createdAt: "2026-03-11",
  },
  {
    id: "p4",
    slug: "buket-chervono-bilyy",
    name: "Букет «Червоно-білий»",
    price: 1100,
    categoryId: "roses",
    description: "Конtrastні червоні та білі троянди в чорному оформленні.",
    composition: "Троянди червоні та білі, еucalyptus, упаковка чорна",
    image: photo("bloom-10.png"),
    images: [photo("bloom-10.png")],
    createdAt: "2026-03-10",
  },
  {
    id: "p5",
    slug: "buket-u-paketi",
    name: "Букет у брендовому пакеті",
    price: 1100,
    categoryId: "bouquets",
    description:
      "Збірний букет у білому пакеті Bloom: гортензія, троянди, еustoma та зелень.",
    composition: "Гортензія, троянди, еustoma, еucalyptus, пакет Bloom",
    image: photo("bloom-43.png"),
    images: [photo("bloom-43.png")],
    createdAt: "2026-03-09",
  },
  {
    id: "p6",
    slug: "avtorskyy-pastel",
    name: "Авторський букет «Пастель»",
    price: 1450,
    categoryId: "author",
    description:
      "Преміальна мікс-композиція: гортензія, троянди, еustoma та зелень у рожевому крафті.",
    composition: "Garden roses, гортензія, еustoma, еucalyptus",
    image: photo("bloom-11.png"),
    images: [photo("bloom-11.png"), photo("bloom-26.png")],
    isPopular: true,
    createdAt: "2026-03-08",
  },
  {
    id: "p7",
    slug: "hortenziyi-blakit",
    name: "Букет «Гортензії блакитні»",
    price: 900,
    categoryId: "bouquets",
    description: "Обʼємні білі та блакитні гортензії з еucalyptus у білому оформленні.",
    composition: "Гортензії білі та блакитні, еucalyptus, стрічка синя",
    image: photo("bloom-20.png"),
    images: [photo("bloom-20.png")],
    createdAt: "2026-03-07",
  },
  {
    id: "p8",
    slug: "buketiky-hipsofila",
    name: "Букетики з гіпсофіли",
    price: 750,
    categoryId: "bouquets",
    description: "Легкі букетики з білої гіпсофіли в пастельному оформленні на вибір.",
    composition: "Гіпсофіла біла, упаковка на вибір (рожева, мʼятна, персикова)",
    image: photo("bloom-19.png"),
    images: [photo("bloom-19.png")],
    isNew: true,
    createdAt: "2026-03-13",
  },
  {
    id: "p9",
    slug: "hipsofila-v-boksi",
    name: "Гіпсофіла в боксі «Веселка»",
    price: 500,
    categoryId: "compositions",
    description: "Круглий бокс з барвистою гіпсофілою — стильний міні-подарунок.",
    composition: "Гіпсофіла фарбована, бокс велюровий, стрічка Bloom",
    image: photo("bloom-29.png"),
    images: [photo("bloom-29.png")],
    isNew: true,
    createdAt: "2026-03-13",
  },
  {
    id: "p10",
    slug: "kompozyciya-kapsula",
    name: "Композиція «Капсула»",
    price: 650,
    categoryId: "compositions",
    description: "Компактна композиція в круглій коробці з герберами та хриzanthemum.",
    composition: "Гербера, хриzanthemum, троянди spray, еucalyptus",
    image: photo("bloom-03.png"),
    images: [photo("bloom-03.png"), photo("bloom-40.png")],
    createdAt: "2026-03-06",
  },
  {
    id: "p11",
    slug: "podarunok-vedmedyk",
    name: "Квіти та ведмедик",
    price: 650,
    categoryId: "gifts",
    description: "Білий бокс з квітами та плюшевим ведмедиком у рожевому — готовий подарунок.",
    composition: "Хриzanthemum, гербера, ведмедик плюшевий (окремо 500 грн)",
    image: photo("bloom-08.png"),
    images: [photo("bloom-08.png")],
    createdAt: "2026-03-05",
  },
  {
    id: "p12",
    slug: "podarunok-zaychyk",
    name: "Набір «Червона коробка»",
    price: 650,
    categoryId: "gifts",
    description: "Червона коробка з білими хриzanthemum, трояндами та декоративним зайчиком.",
    composition: "Хриzanthemum, троянди, декор, коробка",
    image: photo("bloom-07.png"),
    images: [photo("bloom-07.png")],
    createdAt: "2026-03-04",
  },
  {
    id: "p13",
    slug: "buket-dostavka-1000",
    name: "Букет у подарунковому пакеті",
    price: 1000,
    categoryId: "author",
    description:
      "Авторський букет у білому пакеті Bloom: гортензія, троянди, орхідея та зелень.",
    composition: "Гортензія, троянди, орхідея, еucalyptus, пакет Bloom",
    image: photo("bloom-23.png"),
    images: [photo("bloom-23.png")],
    isPopular: true,
    createdAt: "2026-03-03",
  },
  {
    id: "p14",
    slug: "miks-pastelnyy",
    name: "Букет «Пастельний мікс»",
    price: 1400,
    categoryId: "bouquets",
    description: "Гортензія, троянди та еustoma в біло-рожевому офорmленні.",
    composition: "Гортензія блакитна, троянди, еustoma, упаковка біло-рожева",
    image: photo("bloom-26.png"),
    images: [photo("bloom-26.png")],
    createdAt: "2026-03-02",
  },
  {
    id: "p15",
    slug: "nabir-premium-paket",
    name: "Набір у брендовому пакеті",
    price: 1500,
    categoryId: "gifts",
    description: "Великий букет у білому пакеті Bloom з насиченим міксом сезонних квітів.",
    composition: "Гортензія, гербера, троянди, еustoma, пакет Bloom",
    image: photo("bloom-38.png"),
    images: [photo("bloom-38.png")],
    isNew: true,
    createdAt: "2026-03-14",
  },
  {
    id: "p16",
    slug: "buket-rozhevyy-miks",
    name: "Букет «Рожевий мікс»",
    price: 1200,
    categoryId: "bouquets",
    description: "Яскравий рожевий букет з орхідеєю, трояндами та хриzanthemum.",
    composition: "Орхідея, троянди, хриzanthemum, еucalyptus, упаковка рожева",
    image: photo("bloom-33.png"),
    images: [photo("bloom-33.png")],
    createdAt: "2026-02-28",
  },
  {
    id: "p17",
    slug: "buket-sonyachnyy",
    name: "Букет «Сонячний»",
    price: 1300,
    categoryId: "bouquets",
    description: "Теплий мікс з гортензією, герберами та пастельними акцентами.",
    composition: "Гортензія, гербера, троянди spray, зелень",
    image: photo("bloom-17.png"),
    images: [photo("bloom-17.png")],
    createdAt: "2026-02-25",
  },
  {
    id: "p18",
    slug: "buket-vesillia-classic",
    name: "Букет «Весільна класика»",
    price: 1600,
    categoryId: "author",
    description: "Біло-зелена авторська композиція для особливої події.",
    composition: "Троянди, піони, зелень premium, упаковка шовк",
    image: photo("bloom-42.png"),
    images: [photo("bloom-42.png")],
    createdAt: "2026-02-20",
  },
  {
    id: "p19",
    slug: "raffaello",
    name: "Raffaello",
    price: 250,
    categoryId: "gifts",
    description: "Класична коробка Raffaello — доповнення до букета або окремий подарунок.",
    composition: "Конфети Raffaello, оригінальна упаковка",
    image: photo("gift-sweets-plush.png"),
    images: [photo("gift-sweets-plush.png")],
    createdAt: "2026-03-15",
  },
  {
    id: "p20",
    slug: "ferrero-rocher-malyy",
    name: "Ferrero Rocher",
    price: 250,
    categoryId: "gifts",
    description: "Невелика коробка Ferrero Rocher — зручно додати до квітів.",
    composition: "Ferrero Rocher, упаковка",
    image: photo("gift-sweets-plush.png"),
    images: [photo("gift-sweets-plush.png")],
    createdAt: "2026-03-15",
  },
  {
    id: "p21",
    slug: "ferrero-collection",
    name: "Ferrero Collection",
    price: 650,
    categoryId: "gifts",
    description: "Асорті Ferrero Rocher, Raffaello та Rondnoir у подарунковій коробці.",
    composition: "Ferrero Collection, асорті",
    image: photo("gift-sweets-plush.png"),
    images: [photo("gift-sweets-plush.png")],
    isNew: true,
    createdAt: "2026-03-16",
  },
  {
    id: "p22",
    slug: "ferrero-rocher-24",
    name: "Ferrero Rocher 24",
    price: 850,
    categoryId: "gifts",
    description: "Велика прозора коробка Ferrero Rocher — 24 цукерки.",
    composition: "Ferrero Rocher 24 шт",
    image: photo("gift-sweets-plush.png"),
    images: [photo("gift-sweets-plush.png")],
    createdAt: "2026-03-14",
  },
  {
    id: "p23",
    slug: "podarunok-plush-premium",
    name: "Подарунковий набір з іграшкою",
    price: 1000,
    categoryId: "gifts",
    description: "Плюшева іграшка в циліндричній упаковці зі стрічкою — готовий сюрприз.",
    composition: "Плюшева іграшка, подарункова упаковка",
    image: photo("gift-plush-shelf.png"),
    images: [photo("gift-plush-shelf.png")],
    isPopular: true,
    createdAt: "2026-03-16",
  },
  {
    id: "p24",
    slug: "nabir-kinder-vedmedyk",
    name: "Набір з ведмедиком та Kinder",
    price: 700,
    categoryId: "gifts",
    description: "Ведмедик у прозорій коробці з Kinder Surprise — популярний подарунок.",
    composition: "Плюшевий ведмедик, Kinder Surprise, упаковка",
    image: photo("gift-plush-shelf.png"),
    images: [photo("gift-plush-shelf.png")],
    createdAt: "2026-03-13",
  },
  {
    id: "p25",
    slug: "vedmedyk-plushevyy",
    name: "Ведмедик плюшевий",
    price: 500,
    categoryId: "gifts",
    description: "Мʼякий ведмедик у светрі — доповнення до букета.",
    composition: "Плюшевий ведмедик",
    image: photo("gift-plush-shelf.png"),
    images: [photo("gift-plush-shelf.png")],
    createdAt: "2026-03-12",
  },
  {
    id: "p26",
    slug: "buket-19-bilyh-trojand",
    name: "19 білих троянд «Premium»",
    price: 1200,
    categoryId: "gifts",
    description: "19 кремових троянд у чорному оформленні зі стрічкою Bloom.",
    composition: "19 білих троянд, упаковка чорна, стрічка Bloom",
    image: photo("gift-roses-19-black.png"),
    images: [photo("gift-roses-19-black.png")],
    isNew: true,
    isPopular: true,
    createdAt: "2026-03-17",
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getProductPrice(product: Product, sizeId?: string): number {
  if (!sizeId || !product.sizes) return product.price;
  const size = product.sizes.find((s) => s.id === sizeId);
  return product.price + (size?.priceModifier ?? 0);
}

export function getRelatedProducts(product: Product, limit = 8): Product[] {
  const same = products.filter(
    (p) => p.categoryId === product.categoryId && p.id !== product.id,
  );
  if (same.length >= limit) return same.slice(0, limit);
  const rest = products.filter(
    (p) => p.id !== product.id && p.categoryId !== product.categoryId,
  );
  return [...same, ...rest].slice(0, limit);
}

export type SortKey = "newest" | "price-asc" | "price-desc";

export function sortProducts(list: Product[], sort: SortKey): Product[] {
  const copy = [...list];
  switch (sort) {
    case "price-asc":
      return copy.sort((a, b) => a.price - b.price);
    case "price-desc":
      return copy.sort((a, b) => b.price - a.price);
    default:
      return copy.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
  }
}

export function filterProducts(
  list: Product[],
  categoryId: string,
  minPrice?: number,
  maxPrice?: number,
): Product[] {
  return list.filter((p) => {
    if (categoryId === "new") {
      if (!p.isNew) return false;
    } else if (categoryId !== "all" && p.categoryId !== categoryId) {
      return false;
    }
    if (minPrice != null && p.price < minPrice) return false;
    if (maxPrice != null && p.price > maxPrice) return false;
    return true;
  });
}
