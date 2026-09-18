export type CategoryId =
  | "all"
  | "bouquets"
  | "roses"
  | "author"
  | "compositions"
  | "gifts"
  | "new";

export type ProductSize = {
  id: string;
  label: string;
  priceModifier: number;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  price: number;
  compareAtPrice?: number;
  categoryId: Exclude<CategoryId, "all">;
  description: string;
  composition: string;
  image: string;
  images: string[];
  sizes?: ProductSize[];
  isNew?: boolean;
  isPopular?: boolean;
  isPromo?: boolean;
  createdAt: string;
};

export type CartLine = {
  productId: string;
  sizeId?: string;
  quantity: number;
};

export type DeliveryMethod = "courier" | "pickup";

export type CheckoutForm = {
  name: string;
  phone: string;
  deliveryMethod: DeliveryMethod;
  address: string;
  date: string;
  time: string;
  comment: string;
};
