import { HomeCatalogPreview } from "@/components/home/HomeCatalogPreview";
import { MinimalStoreBar } from "@/components/home/MinimalStoreBar";
import { Benefits } from "@/components/home/Benefits";
import { DeliverySection } from "@/components/home/DeliverySection";
import { ContactsSection } from "@/components/home/ContactsSection";

export default function HomePage() {
  return (
    <>
      <MinimalStoreBar />
      <HomeCatalogPreview />
      <Benefits />
      <DeliverySection />
      <ContactsSection />
    </>
  );
}
