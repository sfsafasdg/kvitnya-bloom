import createImageUrlBuilder from "@sanity/image-url";
import { getSanityReadClient } from "./client";
import { isSanityConfigured } from "./env";

export function urlForImage(source: unknown): string | null {
  if (!source || typeof source !== "object" || !isSanityConfigured()) {
    return null;
  }
  try {
    const builder = createImageUrlBuilder(getSanityReadClient());
    return builder.image(source).width(1200).quality(85).url();
  } catch {
    return null;
  }
}
