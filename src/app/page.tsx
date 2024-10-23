import { PRODUCTS_URL } from "@/constants/general";
import type { Product, ProductResponse } from "@/types/product";
import ProductDataTable from "./ProductDataTable";
import { productColumns } from "./ProductColumns";

async function fetchProducts() {
  const response = await fetch(PRODUCTS_URL, { cache: "force-cache" });

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  const products = await (response.json() as Promise<ProductResponse[]>);

  return products.map((product) => ({
    ...product,
    price: +product.price.slice(1) || 0,
    value: +product.value.slice(1) || 0,
  })) as Product[];
}

export default async function Home() {
  const products = await fetchProducts();

  return <ProductDataTable columns={productColumns} data={products} />;
}
