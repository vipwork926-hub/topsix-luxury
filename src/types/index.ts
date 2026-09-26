export type Product = {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  category: ProductCategory;
  sizes: string[];
  colors: string[];
  world: string;
  occasion: string[];
  tags: string[];
  stock: number;
  inStock: boolean;
};

export type ProductCategory =
  | "Lingerie"
  | "Nightwear"
  | "Bodies"
  | "Robes"
  | "Sets"
  | "Accessories";

export type World = {
  id: string;
  name: string;
  mood: string;
  message: string;
  image: string;
};

export type Department = {
  id: string;
  name: ProductCategory;
  visible: boolean;
};

export type MockOrder = {
  id: string;
  customer: string;
  email: string;
  productNames: string[];
  total: number;
  status: "New" | "Preparing" | "Dispatched" | "Delivered";
  placedAt: string;
};

export type ConciergeRequest = {
  id: string;
  name: string;
  email: string;
  whatsapp: string;
  mood: string;
  occasion: string;
  receivedAt: string;
};