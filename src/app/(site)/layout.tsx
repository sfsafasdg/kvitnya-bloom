import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Providers } from "@/app/providers";
import { fetchProducts, fetchStoreSettings } from "@/lib/catalog";

export const revalidate = 60;

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const [products, store] = await Promise.all([
    fetchProducts(),
    fetchStoreSettings(),
  ]);

  return (
    <Providers products={products} store={store}>
      <Header />
      <main className="flex-1 overflow-x-hidden">{children}</main>
      <Footer />
    </Providers>
  );
}
