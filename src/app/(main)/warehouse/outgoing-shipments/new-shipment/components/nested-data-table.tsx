"use client";

import {
  Column,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ChevronDown, ChevronRight } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { PalletsByPO, Product, PurchaseOrderData } from "../interfaces";
import {
  getPalletColumns,
  getProductColumns,
  getPurchaseOrderColumns,
} from "./columns";

interface NestedDataTableProps {
  data: PurchaseOrderData[];
  addProductToShipment: any;
  addPalletProductToShipment: any;
  addPoPalletsProductsToShipment: any;
}

export function NestedDataTable({
  data,
  addProductToShipment,
  addPalletProductToShipment,
  addPoPalletsProductsToShipment,
}: NestedDataTableProps) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [expandedRows, setExpandedRows] = React.useState<
    Record<string, boolean>
  >({});

  const table = useReactTable({
    data,
    columns: getPurchaseOrderColumns(addPoPalletsProductsToShipment),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  const toggleRowExpanded = (rowId: string) => {
    setExpandedRows((prev) => ({
      ...prev,
      [rowId]: !prev[rowId],
    }));
  };

  return (
    <div className="w-full dark:bg-dark">
      <div className="rounded-md border">
        <Table className="bg-white dark:bg-dark">
          <TableHeader className="bg-gray-100 dark:bg-dark-2">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow className="w-full" key={headerGroup.id}>
                <TableHead className="">Show Pallets</TableHead>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="">
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
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <React.Fragment key={row.id}>
                  <TableRow
                    data-state={row.getIsSelected() && "selected"}
                    className="border-b border-gray-200 dark:border-gray-700"
                  >
                    <TableCell className="dark:text-gray-300">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleRowExpanded(row.id)}
                        className="dark:text-gray-300 dark:hover:bg-dark-3"
                      >
                        {expandedRows[row.id] ? (
                          <ChevronDown className="h-4 w-4" />
                        ) : (
                          <ChevronRight className="h-4 w-4" />
                        )}
                      </Button>
                    </TableCell>
                    {row.getAllCells().map((cell) => (
                      <TableCell className="dark:text-gray-300" key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                  {expandedRows[row.id] && (
                    <TableRow>
                      <TableCell
                        colSpan={
                          getPurchaseOrderColumns(
                            addPoPalletsProductsToShipment
                          ).length + 1
                        }
                        className="dark:text-gray-300"
                      >
                        <PalletTable
                          pallets={row.original.pallets}
                          addPalletProductToShipment={
                            addPalletProductToShipment
                          }
                          addProductToShipment={addProductToShipment}
                        />
                      </TableCell>
                    </TableRow>
                  )}
                </React.Fragment>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={
                    getPurchaseOrderColumns(addPoPalletsProductsToShipment)
                      .length + 1
                  }
                  className="h-24 text-center dark:text-gray-300"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

interface PalletTableProps {
  pallets: PalletsByPO[];
  addPalletProductToShipment: any;
  addProductToShipment: any;
}

export function PalletTable({
  pallets,
  addPalletProductToShipment,
  addProductToShipment,
}: PalletTableProps) {
  const [expandedRows, setExpandedRows] = React.useState<
    Record<string, boolean>
  >({});

  const toggleRowExpanded = (rowId: string) => {
    setExpandedRows((prev) => ({
      ...prev,
      [rowId]: !prev[rowId],
    }));
  };

  return (
    <Table className="bg-gray-50 dark:bg-dark">
      <TableHeader className="bg-gray-200 dark:bg-dark-3">
        <TableRow>
          <TableHead className="w-[40px]">Show Products</TableHead>
          {getPalletColumns(addPalletProductToShipment).map((column, index) => (
            <TableHead
              key={index}
              className={`${
                typeof column.header === "string"
                  ? column.header === "Actions" && "text-right"
                  : ""
              }`}
            >
              {typeof column.header === "function"
                ? // @ts-ignore
                  column.header({
                    column: column as unknown as Column<PalletsByPO, unknown>,
                  })
                : column.header}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>

      <TableBody>
        {/* Renderizar filas */}
        {pallets.map((pallet) => (
          <React.Fragment key={pallet.pallet_id}>
            {/* Fila principal */}
            <TableRow className="border-b border-gray-100 dark:border-gray-700">
              <TableCell className="dark:text-gray-300">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleRowExpanded(pallet.pallet_id.toString())}
                  className="dark:text-gray-300 dark:hover:bg-dark-3"
                >
                  {expandedRows[pallet.pallet_id.toString()] ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </Button>
              </TableCell>
              {getPalletColumns(addPalletProductToShipment).map(
                (column, columnIndex) => (
                  <TableCell className="dark:text-gray-300" key={columnIndex}>
                    {flexRender(
                      column.cell,
                      // @ts-ignore
                      { row: { original: pallet } }
                    )}
                  </TableCell>
                )
              )}
            </TableRow>

            {/* Fila expandida */}
            {expandedRows[pallet.pallet_id.toString()] && (
              <TableRow>
                <TableCell
                  colSpan={
                    getPalletColumns(addPalletProductToShipment).length + 1
                  }
                  className="dark:text-gray-300"
                >
                  <ProductTable
                    products={pallet.products}
                    addProductToShipment={addProductToShipment}
                  />
                </TableCell>
              </TableRow>
            )}
          </React.Fragment>
        ))}
      </TableBody>
    </Table>
  );
}

interface ProductTableProps {
  products: Product[];
  addProductToShipment: (product: any, quantity: number) => void;
}

export function ProductTable({
  products,
  addProductToShipment,
}: ProductTableProps) {
  return (
    <Table className="bg-blue-50 dark:bg-dark">
      <TableHeader className="bg-blue-100 dark:bg-gray-500">
        <TableRow className="">
          {getProductColumns(addProductToShipment).map((column, index) => (
            <TableHead
              key={index}
              className={`${
                typeof column.header === "string"
                  ? column.header === "Actions" && "text-right"
                  : ""
              }`}
            >
              {typeof column.header === "function"
                ? // @ts-ignore
                  column.header({
                    column: column as unknown as Column<Product, unknown>,
                  })
                : column.header}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((product) => (
          <TableRow
            key={product.pallet_product_id}
            className="border-b border-blue-100 dark:border-blue-800"
          >
            {getProductColumns(addProductToShipment).map(
              (column: any, index: number) => (
                <TableCell className="dark:text-gray-300" key={index}>
                  {flexRender(column.cell, {
                    // @ts-ignore
                    row: { original: product },
                  })}
                </TableCell>
              )
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
