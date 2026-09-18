"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useCatalog } from "@/context/CatalogContext";
import type { CartLine } from "@/lib/types";

const STORAGE_KEY = "bloom-flowers-cart-v1";

type CartContextValue = {
  lines: CartLine[];
  itemCount: number;
  subtotal: number;
  addItem: (productId: string, sizeId?: string, qty?: number) => void;
  removeItem: (productId: string, sizeId?: string) => void;
  setQuantity: (productId: string, quantity: number, sizeId?: string) => void;
  clearCart: () => void;
  lineKey: (line: CartLine) => string;
};

const CartContext = createContext<CartContextValue | null>(null);

function lineKey(line: CartLine): string {
  return `${line.productId}:${line.sizeId ?? "default"}`;
}

function loadStored(): CartLine[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as CartLine[];
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const { getProductById, getProductPrice } = useCatalog();
  const [lines, setLines] = useState<CartLine[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setLines(loadStored());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
  }, [lines, hydrated]);

  const addItem = useCallback(
    (productId: string, sizeId?: string, qty = 1) => {
      setLines((prev) => {
        const key = `${productId}:${sizeId ?? "default"}`;
        const idx = prev.findIndex((l) => lineKey(l) === key);
        if (idx >= 0) {
          const next = [...prev];
          next[idx] = {
            ...next[idx],
            quantity: next[idx].quantity + qty,
          };
          return next;
        }
        return [...prev, { productId, sizeId, quantity: qty }];
      });
    },
    [],
  );

  const removeItem = useCallback((productId: string, sizeId?: string) => {
    const key = `${productId}:${sizeId ?? "default"}`;
    setLines((prev) => prev.filter((l) => lineKey(l) !== key));
  }, []);

  const setQuantity = useCallback(
    (productId: string, quantity: number, sizeId?: string) => {
      if (quantity < 1) {
        removeItem(productId, sizeId);
        return;
      }
      const key = `${productId}:${sizeId ?? "default"}`;
      setLines((prev) =>
        prev.map((l) =>
          lineKey(l) === key ? { ...l, quantity } : l,
        ),
      );
    },
    [removeItem],
  );

  const clearCart = useCallback(() => setLines([]), []);

  const subtotal = useMemo(
    () =>
      lines.reduce((sum, line) => {
        const product = getProductById(line.productId);
        if (!product) return sum;
        return (
          sum + getProductPrice(product, line.sizeId) * line.quantity
        );
      }, 0),
    [lines, getProductById, getProductPrice],
  );

  const itemCount = useMemo(
    () => lines.reduce((n, l) => n + l.quantity, 0),
    [lines],
  );

  const value = useMemo(
    () => ({
      lines,
      itemCount,
      subtotal,
      addItem,
      removeItem,
      setQuantity,
      clearCart,
      lineKey,
    }),
    [
      lines,
      itemCount,
      subtotal,
      addItem,
      removeItem,
      setQuantity,
      clearCart,
    ],
  );

  return (
    <CartContext.Provider value={value}>{children}</CartContext.Provider>
  );
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
