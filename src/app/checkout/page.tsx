import { CheckoutForm } from "@/components/checkout/CheckoutForm";
import { Container } from "@/components/ui/Container";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Оформлення замовлення",
};

export default function CheckoutPage() {
  return (
    <div className="bg-cream py-10 sm:py-14">
      <Container>
        <h1 className="mb-8 font-display text-4xl text-forest">
          Оформлення замовлення
        </h1>
        <CheckoutForm />
      </Container>
    </div>
  );
}
