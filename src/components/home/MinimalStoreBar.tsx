import { store } from "@/data/store";
import { Container } from "@/components/ui/Container";

export function MinimalStoreBar() {
  return (
    <div className="border-b border-line bg-white">
      <Container className="flex flex-wrap items-center justify-between gap-2 py-2.5 text-xs text-muted sm:text-sm">
        <p>
          <span className="font-medium text-forest">{store.name}</span>
          <span className="mx-2 hidden text-line sm:inline">|</span>
          <span className="hidden sm:inline">{store.city}</span>
        </p>
        <p className="tabular-nums">{store.hours}</p>
      </Container>
    </div>
  );
}
