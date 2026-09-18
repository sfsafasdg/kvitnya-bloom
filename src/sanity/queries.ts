export const productsQuery = `*[_type == "product"] | order(createdAt desc) {
  _id,
  legacyId,
  "slug": slug.current,
  name,
  price,
  compareAtPrice,
  categoryId,
  description,
  composition,
  image,
  legacyImagePath,
  gallery,
  isNew,
  isPopular,
  isPromo,
  createdAt,
  sizes
}`;

export const productBySlugQuery = `*[_type == "product" && slug.current == $slug][0] {
  _id,
  legacyId,
  "slug": slug.current,
  name,
  price,
  compareAtPrice,
  categoryId,
  description,
  composition,
  image,
  legacyImagePath,
  gallery,
  isNew,
  isPopular,
  isPromo,
  createdAt,
  sizes
}`;

export const storeSettingsQuery = `*[_type == "storeSettings"][0] {
  name,
  mark,
  submark,
  address,
  phone,
  phoneTel,
  hours,
  city,
  instagram,
  instagramHandle
}`;
