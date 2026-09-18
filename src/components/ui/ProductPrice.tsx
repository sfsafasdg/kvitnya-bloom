import { formatPrice } from "@/lib/format";
import { cn } from "@/lib/cn";

export function ProductPrice({
  amount,
  className,
  size = "card",
}: {
  amount: number;
  className?: string;
  size?: "card" | "page";
}) {
  return (
    <p
      className={cn(
        "font-display font-medium tabular-nums tracking-tight text-forest",
        size === "page" ? "text-[1.625rem] sm:text-[1.75rem]" : "mt-0.5 text-[1.125rem]",
        className,
      )}
    >
      {formatPrice(amount)}
    </p>
  );
}
