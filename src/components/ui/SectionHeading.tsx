import { cn } from "@/lib/cn";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        align === "center" && "text-center mx-auto max-w-2xl",
        className,
      )}
    >
      {eyebrow ? (
        <p className="mb-3 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-muted">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="font-display text-3xl leading-tight text-forest sm:text-4xl lg:text-[2.75rem]">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
}
