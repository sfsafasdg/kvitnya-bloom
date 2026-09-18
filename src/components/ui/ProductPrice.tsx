import { formatPrice } from "@/lib/format";
import { cn } from "@/lib/cn";

export function ProductPrice({
  amount,
  compareAt,
  className,
  size = "card",
}: {
  amount: number;
  compareAt?: number;
  className?: string;
  size?: "card" | "page";
}) {
  const onSale =
    compareAt != null && compareAt > amount && compareAt > 0;

  return (
    <div
      className={cn(
        "font-display font-medium tabular-nums tracking-tight text-forest",
        size === "page" ? "text-[1.625rem] sm:text-[1.75rem]" : "mt-0.5 text-[1.125rem]",
        className,
      )}
    >
      {onSale ? (
        <span className="flex flex-wrap items-baseline gap-2">
          <span>{formatPrice(amount)}</span>
          <span className="text-sm font-normal text-muted line-through">
            {formatPrice(compareAt)}
          </span>
        </span>
      ) : (
        <p>{formatPrice(amount)}</p>
      )}
    </div>
  );
}
