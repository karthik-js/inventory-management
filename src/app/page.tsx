import { PRODUCTS_URL } from "@/constants/general";
import type { Product, ProductResponse } from "@/types/product";
import ProductsView from "./ProductsView";
import { unstable_cache } from "next/cache";

const fetchProducts = unstable_cache(
  async function fetchProducts() {
    const response = await fetch(PRODUCTS_URL, { cache: "force-cache" });

    console.log("fetching products");

    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }

    const products = await(response.json() as Promise<ProductResponse[]>);

    return products.map((product) => ({
      ...product,
      price: +product.price.slice(1) || 0,
      value: +product.value.slice(1) || 0,
      slug: crypto.randomUUID(),
      isDisabled: false,
    })) as Product[];
  },
  ["products"],
  // cache for 1 hour
  { revalidate: 3600, tags: ["products"] }
);



export default async function InventoryDashboard() {
  const products = await fetchProducts();

  return <ProductsView products={products} />;
}
