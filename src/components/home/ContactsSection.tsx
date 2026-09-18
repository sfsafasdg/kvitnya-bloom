"use client";

import Link from "next/link";
import { useState } from "react";
import { useCatalog } from "@/context/CatalogContext";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { InstagramIconLink } from "@/components/ui/InstagramIconLink";

export function ContactsSection() {
  const { store } = useCatalog();
  const [phoneOpen, setPhoneOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  async function copyPhone() {
    try {
      await navigator.clipboard.writeText(store.phone);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* fallback: number remains visible for manual copy */
    }
  }

  return (
    <section id="contacts" className="scroll-mt-[4.5rem] bg-forest py-12 text-cream sm:py-14">
      <Container className="grid gap-8 lg:grid-cols-2 lg:items-start">
        <div>
          <h2 className="font-display text-xl font-normal text-cream sm:text-2xl">
            Контакти
          </h2>
          <p className="mt-2 max-w-sm text-sm leading-relaxed text-cream/65">
            Завітайте до магазину або зателефонуйте — допоможемо обрати букет.
          </p>
        </div>

        <div className="rounded-2xl border border-cream/12 bg-cream/[0.04] p-6 sm:p-7">
          <dl className="space-y-4 text-sm">
            <div>
              <dt className="text-[11px] font-medium uppercase tracking-[0.14em] text-cream/45">
                Адреса
              </dt>
              <dd className="mt-1 text-base text-cream/90">{store.address}</dd>
            </div>
            <div>
              <dt className="text-[11px] font-medium uppercase tracking-[0.14em] text-cream/45">
                Телефон
              </dt>
              <dd className="mt-1 text-base text-cream/90">{store.phone}</dd>
            </div>
            <div>
              <dt className="text-[11px] font-medium uppercase tracking-[0.14em] text-cream/45">
                Графік
              </dt>
              <dd className="mt-1 text-base text-cream/90">{store.hours}</dd>
            </div>
            <div>
              <dt className="text-[11px] font-medium uppercase tracking-[0.14em] text-cream/45">
                Instagram
              </dt>
              <dd className="mt-2">
                <InstagramIconLink variant="contacts" />
              </dd>
            </div>
          </dl>

          <div className="mt-7 flex flex-col gap-2.5">
            {!phoneOpen ? (
              <Button type="button" variant="secondary" onClick={() => setPhoneOpen(true)}>
                Зателефонувати
              </Button>
            ) : (
              <div className="rounded-lg border border-cream/15 bg-cream/10 p-4">
                <p className="text-xs text-cream/55">Наш номер</p>
                <input
                  type="text"
                  readOnly
                  value={store.phone}
                  onFocus={(e) => e.target.select()}
                  onClick={(e) => e.currentTarget.select()}
                  className="mt-2 w-full cursor-text rounded-lg border border-cream/20 bg-cream px-3 py-2.5 font-display text-lg tabular-nums tracking-tight text-forest outline-none selection:bg-blush/30"
                  aria-label="Номер телефону"
                />
                <div className="mt-3 flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={copyPhone}
                    className="rounded-lg bg-cream px-4 py-2 text-sm font-medium text-forest transition-colors hover:bg-cream/90"
                  >
                    {copied ? "Скопійовано ✓" : "Скопіювати номер"}
                  </button>
                  <a
                    href={`tel:${store.phoneTel}`}
                    className="rounded-lg border border-cream/25 px-4 py-2 text-sm text-cream/90 transition-colors hover:bg-cream/10"
                  >
                    Зателефонувати
                  </a>
                </div>
              </div>
            )}

            <Link
              href="/catalog"
              className="inline-flex items-center justify-center rounded-lg bg-cream px-5 py-3 text-sm font-semibold text-forest transition-colors hover:bg-cream/90"
            >
              До каталогу
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
