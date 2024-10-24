"use client";

import { useAppDispatch } from "@/lib/hooks";
import { addProducts } from "@/lib/stores/features/products/productsSlice";
import type { Product } from "@/types/product";
import { useEffect } from "react";
import ProductDataTable from "./ProductDataTable";
import { productColumns } from "./ProductColumns";
import InventoryOverview from "./InventoryOverview";
import UpdateProductDialog from "./UpdateProductDialog";

export default function ProductsView({ products }: { products: Product[] }) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(addProducts(products));
  }, [dispatch, products]);

  return (
    <>
      <InventoryOverview />
      <ProductDataTable columns={productColumns} />
      <UpdateProductDialog />
    </>
  );
}
