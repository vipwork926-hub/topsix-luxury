import type { Product, ProductCategory } from "@/types";

const categories: ProductCategory[] = [
  "Lingerie",
  "Nightwear",
  "Bodies",
  "Robes",
  "Sets",
  "Accessories",
];

const productFields = new Set([
  "slug",
  "name",
  "description",
  "price",
  "images",
  "category",
  "sizes",
  "colors",
  "world",
  "occasion",
  "tags",
  "stock",
  "inStock",
]);

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((item) => typeof item === "string");
}

export function validateNewProduct(value: unknown): Omit<Product, "id"> | null {
  if (!isRecord(value)) return null;
  const { slug, name, description, price, images, category, sizes, colors, world, occasion, tags, stock } = value;

  if (
    typeof slug !== "string" || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) ||
    typeof name !== "string" || !name.trim() ||
    typeof description !== "string" ||
    typeof price !== "number" || !Number.isFinite(price) || price < 0 ||
    !isStringArray(images) || !isStringArray(sizes) || !isStringArray(colors) ||
    !isStringArray(occasion) || !isStringArray(tags) ||
    typeof category !== "string" || !categories.includes(category as ProductCategory) ||
    typeof world !== "string" || !world.trim() ||
    typeof stock !== "number" || !Number.isInteger(stock) || stock < 0
  ) {
    return null;
  }

  return {
    slug,
    name: name.trim(),
    description: description.trim(),
    price,
    images,
    category: category as ProductCategory,
    sizes,
    colors,
    world: world.trim(),
    occasion,
    tags,
    stock,
    inStock: stock > 0,
  };
}

export function validateProductPatch(value: unknown): Partial<Omit<Product, "id">> | null {
  if (!isRecord(value)) return null;
  const entries = Object.entries(value);
  if (entries.length === 0 || entries.some(([key]) => !productFields.has(key))) return null;

  const patch: Partial<Omit<Product, "id">> = {};
  for (const [key, field] of entries) {
    switch (key) {
      case "slug":
        if (typeof field !== "string" || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(field)) return null;
        patch.slug = field;
        break;
      case "name":
      case "world":
        if (typeof field !== "string" || !field.trim()) return null;
        patch[key] = field.trim();
        break;
      case "description":
        if (typeof field !== "string") return null;
        patch.description = field.trim();
        break;
      case "price":
        if (typeof field !== "number" || !Number.isFinite(field) || field < 0) return null;
        patch.price = field;
        break;
      case "category":
        if (typeof field !== "string" || !categories.includes(field as ProductCategory)) return null;
        patch.category = field as ProductCategory;
        break;
      case "images":
      case "sizes":
      case "colors":
      case "occasion":
      case "tags":
        if (!isStringArray(field)) return null;
        patch[key] = field;
        break;
      case "stock":
        if (typeof field !== "number" || !Number.isInteger(field) || field < 0) return null;
        patch.stock = field;
        if (!Object.hasOwn(value, "inStock")) patch.inStock = field > 0;
        break;
      case "inStock":
        if (typeof field !== "boolean") return null;
        patch.inStock = field;
        break;
    }
  }

  if (
    typeof value.stock === "number" &&
    typeof value.inStock === "boolean" &&
    value.inStock !== (value.stock > 0)
  ) {
    return null;
  }

  return patch;
}