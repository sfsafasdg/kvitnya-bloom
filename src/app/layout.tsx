import type { Metadata } from "next";
import { EB_Garamond, Manrope } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Providers } from "./providers";
import "./globals.css";

const ebGaramond = EB_Garamond({
  variable: "--font-eb-garamond",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: {
    default: "Bloom Flowers — квітковий магазин",
    template: "%s | Bloom Flowers",
  },
  description:
    "Інтернет-магазин квітів у Білій Церкві. Букети, троянди, композиції та подарунки з доставкою.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="uk"
      className={`${ebGaramond.variable} ${manrope.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col font-sans text-forest">
        <Providers>
          <Header />
          <main className="flex-1 overflow-x-hidden">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
