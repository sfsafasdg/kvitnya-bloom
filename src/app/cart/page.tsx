import { CartView } from "@/components/cart/CartView";
import { Container } from "@/components/ui/Container";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Кошик",
};

export default function CartPage() {
  return (
    <div className="bg-cream py-10 sm:py-14">
      <Container>
        <CartView />
      </Container>
    </div>
  );
}
