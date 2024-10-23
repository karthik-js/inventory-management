"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Product } from "@/types/product";
import type { ColumnDef } from "@tanstack/react-table";
import { Eye, Pencil, Trash2 } from "lucide-react";

function ColumnHeader({ title }: { title: string }) {
  return (
    <Badge variant="default" className="bg-green-100">
      {title}
    </Badge>
  );
}

export const productColumns: ColumnDef<Product>[] = [
  {
    accessorKey: "name",
    header: () => <ColumnHeader title="Name" />,
  },
  {
    accessorKey: "category",
    header: () => <ColumnHeader title="Category" />,
  },
  {
    accessorKey: "price",
    header: () => <ColumnHeader title="Price" />,
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
    header: () => <ColumnHeader title="Quantity" />,
  },
  {
    accessorKey: "value",
    header: () => <ColumnHeader title="Value" />,
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
    header: () => <ColumnHeader title="Actions" />,
    cell: function ({ row }) {
      const product = row.original;

      function onActionClick(event: React.MouseEvent<HTMLUListElement>) {
        const target = event.target as HTMLElement;

        if (target.closest("button") !== null) {
          const actionType = target.closest("button")!.dataset.action;
          const productName = product.name;

          switch (actionType) {
            case "edit":
              alert(`Edit: ${productName}`);
              break;
            case "view":
              alert(`View: ${productName}`);
              break;
            case "delete":
              alert(`Delete: ${productName}`);
              break;
            default:
              break;
          }
        }
      }

      return (
        <ul className="list-none flex gap-1" onClick={onActionClick}>
          <li>
            <Button variant="outline" size="icon" data-action="edit">
              <Pencil />
            </Button>
          </li>

          <li>
            <Button variant="outline" size="icon" data-action="view">
              <Eye />
            </Button>
          </li>

          <li>
            <Button variant="outline" size="icon" data-action="delete">
              <Trash2 stroke="red" />
            </Button>
          </li>
        </ul>
      );
    },
  },
];
