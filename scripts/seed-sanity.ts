/**
 * Заповнює Sanity товарами та налаштуваннями магазину з локальних файлів.
 * npm run seed:sanity  (потрібен .env.local з ключами)
 */
import { createClient } from "@sanity/client";
import { products } from "../src/data/products";
import { store } from "../src/data/store";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !token) {
  console.error("Додайте NEXT_PUBLIC_SANITY_PROJECT_ID і SANITY_API_WRITE_TOKEN у .env.local");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2025-01-01",
  token,
  useCdn: false,
});

async function seedStore() {
  await client.createOrReplace({
    _id: "storeSettings",
    _type: "storeSettings",
    ...store,
  });
  console.log("✓ Налаштування магазину");
}

async function seedProducts() {
  for (const p of products) {
    await client.createOrReplace({
      _id: `product-${p.id}`,
      _type: "product",
      legacyId: p.id,
      name: p.name,
      slug: { _type: "slug", current: p.slug },
      price: p.price,
      compareAtPrice: p.compareAtPrice,
      categoryId: p.categoryId,
      description: p.description,
      composition: p.composition,
      legacyImagePath: p.image,
      isNew: p.isNew ?? false,
      isPopular: p.isPopular ?? false,
      isPromo: p.isPromo ?? false,
      createdAt: p.createdAt,
      sizes: p.sizes,
    });
  }
  console.log(`✓ ${products.length} товарів`);
}

async function main() {
  await seedStore();
  await seedProducts();
  console.log("\nГотово. Відкрийте /studio — товари та замовлення в Sanity.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
