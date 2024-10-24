"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAppSelector } from "@/lib/hooks";
import type { RootState } from "@/lib/stores/store";
import { cn } from "@/lib/utils";
import type { Product } from "@/types/product";
import { createSelector } from "@reduxjs/toolkit";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  type ColumnDef,
} from "@tanstack/react-table";

interface ProductDataTableProps<TValue> {
  columns: ColumnDef<Product, TValue>[];
}

const selectedProducts = createSelector(
  [
    (state: RootState) => state.products.products,
    (state: RootState) => state.settings.isAdmin,
  ],
  (products, isAdmin) => {
    if (isAdmin) return products;
    return products.filter((product) => !product.isDisabled);
  }
);

export default function ProductDataTable<TValue>({
  columns,
}: ProductDataTableProps<TValue>) {
  const data = useAppSelector(selectedProducts);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => {
            return (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            );
          })}
        </TableHeader>

        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.original.slug}
                className={cn({
                  "bg-gray-500 hover:bg-gray-500": row.original.isDisabled,
                })}
                aria-disabled={row.original.isDisabled}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
