import Link from "next/link";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost" | "outline";

const variants: Record<Variant, string> = {
  primary: "bg-forest text-cream hover:bg-forest/92",
  secondary: "bg-blush text-cream hover:bg-blush/92",
  ghost: "bg-transparent text-forest hover:bg-forest/5",
  outline:
    "border border-line bg-transparent text-forest hover:border-forest/30 hover:bg-white",
};

type ButtonProps = {
  variant?: Variant;
  className?: string;
  children: React.ReactNode;
} & (
  | ({ href: string } & Omit<React.ComponentProps<typeof Link>, "className" | "href">)
  | ({ href?: undefined } & React.ButtonHTMLAttributes<HTMLButtonElement>)
);

export function Button({
  variant = "primary",
  className,
  children,
  href,
  ...rest
}: ButtonProps) {
  const base = cn(
    "inline-flex items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-medium transition-colors duration-200",
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blush/50",
    "disabled:pointer-events-none disabled:opacity-50",
    variants[variant],
    className,
  );

  if (href) {
    return (
      <Link href={href} className={base}>
        {children}
      </Link>
    );
  }

  const { type = "button", ...buttonRest } =
    rest as React.ButtonHTMLAttributes<HTMLButtonElement>;

  return (
    <button className={base} type={type} {...buttonRest}>
      {children}
    </button>
  );
}
