"use client";

import {
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
    <div className="w-full">
      <div className="rounded-md border">
        <Table>
          <TableHeader className="">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow className="" key={headerGroup.id}>
                <TableHead className="w-[40px]"></TableHead>
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
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <React.Fragment key={row.id}>
                  <TableRow data-state={row.getIsSelected() && "selected"}>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleRowExpanded(row.id)}
                      >
                        {expandedRows[row.id] ? (
                          <ChevronDown className="h-4 w-4" />
                        ) : (
                          <ChevronRight className="h-4 w-4" />
                        )}
                      </Button>
                    </TableCell>
                    {row.getAllCells().map((cell) => (
                      <TableCell key={cell.id}>
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
                  className="h-24 text-center"
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

function PalletTable({
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
    <Table>
      <TableHeader>
        <TableRow>
          {/* Botón para expandir */}
          <TableHead className="w-[40px]"></TableHead>
          {/* Renderizar encabezados de las columnas */}
          {getPalletColumns(addPalletProductToShipment).map((column, index) => (
            <TableHead key={index}>
              {column.header as React.ReactNode}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {/* Renderizar filas */}
        {pallets.map((pallet) => (
          <React.Fragment key={pallet.pallet_id}>
            {/* Fila principal */}
            <TableRow>
              <TableCell>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleRowExpanded(pallet.pallet_id.toString())}
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
                  <TableCell key={columnIndex}>
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

function ProductTable({ products, addProductToShipment }: ProductTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {getProductColumns(addProductToShipment).map((column, index) => (
            <TableHead key={index}>
              {column.header as React.ReactNode}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((product) => (
          <TableRow key={product.pallet_product_id}>
            {getProductColumns(addProductToShipment).map(
              (column: any, index: number) => (
                <TableCell key={index}>
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
