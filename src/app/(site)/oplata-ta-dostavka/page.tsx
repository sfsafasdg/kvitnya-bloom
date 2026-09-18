import { Container } from "@/components/ui/Container";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Оплата та доставка",
  description: "Умови оплати та доставки квітів Bloom Flowers у Білій Церкві.",
};

export default function PaymentDeliveryPage() {
  return (
    <div className="bg-cream py-12 sm:py-16">
      <Container className="max-w-3xl">
        <Link href="/" className="text-sm text-blush hover:underline">
          ← На головну
        </Link>
        <h1 className="mt-6 font-display text-3xl text-forest sm:text-4xl">
          Оплата та доставка
        </h1>
        <p className="mt-2 text-muted">Bloom Flowers · м. Біла Церква</p>

        <div className="mt-10 space-y-8 text-sm leading-relaxed text-muted">
          <section>
            <h2 className="font-display text-xl text-forest">Як оформити замовлення</h2>
            <p className="mt-3">
              Оберіть букет у каталозі, додайте до кошика та заповніть форму на сайті. Після
              надсилання заявки менеджер звʼяжеться з вами за вказаним номером телефону для
              підтвердження деталей, наявності квітів та часу доставки.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl text-forest">Оплата</h2>
            <ul className="mt-3 list-inside list-disc space-y-2">
              <li>Оплата після підтвердження замовлення з менеджером.</li>
              <li>Можлива оплата готівкою при отриманні або переказ на карту — уточнюється під час дзвінка.</li>
              <li>Онлайн-оплата на сайті може бути недоступна — орієнтуйтесь на підтвердження від магазину.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-xl text-forest">Доставка</h2>
            <ul className="mt-3 list-inside list-disc space-y-2">
              <li>Доставка курʼєром по м. Біла Церква — за домовленістю після оформлення заявки.</li>
              <li>Самовивіз зі студії: вул. Героїв Небесної Сотні, 7 (графік роботи — на сторінці «Контакти»).</li>
              <li>Вартість доставки залежить від адреси та часу — менеджер повідомить при підтвердженні.</li>
              <li>У святкові дні (8 Березня, 14 Лютого тощо) терміни можуть бути скорочені — бронюйте заздалегідь.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-xl text-forest">Скасування та зміни</h2>
            <p className="mt-3">
              Якщо потрібно змінити час, адресу або скасувати замовлення — зателефонуйте якомога
              раніше. Якщо букет уже зібраний або переданий курʼєру, скасування може бути
              обмеженим — це також уточнює менеджер.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl text-forest">Контакти</h2>
            <p className="mt-3">
              Телефон, адреса та години роботи — у розділі{" "}
              <Link href="/#contacts" className="text-forest underline underline-offset-2 hover:text-blush">
                Контакти
              </Link>{" "}
              на головній сторінці.
            </p>
          </section>
        </div>
      </Container>
    </div>
  );
}
