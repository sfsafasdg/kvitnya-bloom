import { createClient, type SanityClient } from "next-sanity";
import { isSanityConfigured, sanityEnv } from "./env";

let readClient: SanityClient | undefined;
let freshReadClient: SanityClient | undefined;

export function getSanityReadClient(): SanityClient {
  if (!isSanityConfigured()) {
    throw new Error("Sanity is not configured");
  }
  if (!readClient) {
    readClient = createClient({
      ...sanityEnv,
      useCdn: true,
    });
  }
  return readClient;
}

/** Адмінка — без CDN, щоб нові/змінені товари були видні одразу після збереження */
export function getSanityFreshReadClient(): SanityClient {
  if (!isSanityConfigured()) {
    throw new Error("Sanity is not configured");
  }
  if (!freshReadClient) {
    freshReadClient = createClient({
      ...sanityEnv,
      useCdn: false,
    });
  }
  return freshReadClient;
}

export function sanityWriteClient() {
  if (!isSanityConfigured()) {
    throw new Error("Sanity is not configured");
  }
  const token = process.env.SANITY_API_WRITE_TOKEN;
  if (!token) {
    throw new Error("SANITY_API_WRITE_TOKEN is missing");
  }
  return createClient({
    ...sanityEnv,
    useCdn: false,
    token,
  });
}
