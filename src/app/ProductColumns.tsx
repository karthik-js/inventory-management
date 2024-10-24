"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  disableProduct,
  enableProduct,
  removeProduct,
} from "@/lib/stores/features/products/productsSlice";
import type { Product } from "@/types/product";
import type {
  CellContext,
  ColumnDef,
  HeaderContext,
} from "@tanstack/react-table";
import { Eye, Pencil, Trash2, EyeOff } from "lucide-react";
import { useTransition } from "react";

function ColumnHeader({ header }: HeaderContext<Product, unknown>) {
  return (
    <Badge variant="default" className="bg-green-100">
      {header.id}
    </Badge>
  );
}

function RenderActions({ row }: CellContext<Product, unknown>) {
  const product = row.original;

  const { isAdmin } = useAppSelector((state) => state.settings);
  const dispatch = useAppDispatch();
  const [, startTransition] = useTransition();

  function onActionClick(event: React.MouseEvent<HTMLUListElement>) {
    const target = event.target as HTMLElement;

    if (target.closest("button") !== null) {
      const actionType = target.closest("button")!.dataset.action;
      const productName = product.name;

      switch (actionType) {
        case "edit":
          alert(`Edit: ${productName}`);
          break;
        case "enable":
          startTransition(() => {
            dispatch(enableProduct(product.slug));
          });
          break;

        case "disable":
          startTransition(() => {
            dispatch(disableProduct(product.slug));
          });
          break;
        case "delete":
          dispatch(removeProduct(product.slug));
          break;
        default:
          break;
      }
    }
  }

  const isDisabled = product.isDisabled || !isAdmin;

  return (
    <ul className="list-none flex gap-1" onClick={onActionClick}>
      <li>
        <Button
          variant="outline"
          size="icon"
          data-action="edit"
          disabled={isDisabled}
          aria-disabled={isDisabled}
        >
          <Pencil />
        </Button>
      </li>

      <li>
        <Button
          variant="outline"
          size="icon"
          data-action={product.isDisabled ? "enable" : "disable"}
          disabled={!isAdmin}
          aria-disabled={!isAdmin}
        >
          {product.isDisabled ? <EyeOff /> : <Eye />}
        </Button>
      </li>

      <li>
        <Button
          variant="outline"
          size="icon"
          data-action="delete"
          disabled={isDisabled}
          aria-disabled={isDisabled}
        >
          <Trash2 stroke="red" />
        </Button>
      </li>
    </ul>
  );
}

export const productColumns: ColumnDef<Product>[] = [
  {
    accessorKey: "name",
    header: ColumnHeader,
  },
  {
    accessorKey: "category",
    header: ColumnHeader,
  },
  {
    accessorKey: "price",
    header: ColumnHeader,
    cell: function ({ row }) {
      const price = parseFloat(row.getValue("price"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(price);

      return formatted;
    },
  },
  {
    accessorKey: "quantity",
    header: ColumnHeader,
  },
  {
    accessorKey: "value",
    header: ColumnHeader,
    cell: function ({ row }) {
      const price = parseFloat(row.getValue("value"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(price);

      return formatted;
    },
  },
  {
    id: "actions",
    header: ColumnHeader,
    cell: RenderActions,
  },
];
