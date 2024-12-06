"use client";

import { ProductNameTableData } from "@/components/inventory/ProductNameTableData";
import { ColumnDef } from "@tanstack/react-table";
import { StorageProduct } from "./interfaces";
import StorageActionsCell from "./storage-actions-cell";
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header";

export const getStorageCols = (
  addProductToShipment: any
): ColumnDef<StorageProduct>[] => [
  {
    accessorKey: "id",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="ID" />;
    },
  },
  {
    accessorKey: "pallet_number",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Pallet Number" />;
    },
    cell: ({ row }) => `#${row.original.pallet_number}`,
  },
  {
    accessorKey: "warehouse_location",
    header: ({ column }) => {
      return (
        <DataTableColumnHeader column={column} title="Warehouse Location" />
      );
    },
  },
  {
    accessorKey: "product_name",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Product" />;
    },
    cell: ({ row }) => (
      <ProductNameTableData product={row.original.product} width={250} />
      // <p>{row.original.product.product_name}</p>
    ),
  },
  {
    accessorKey: "product.seller_sku",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Seller SKU" />;
    },
    cell: ({ row }) => (
      <p className="w-full">{row.original.product.seller_sku}</p>
    ),
  },
  // {
  //   accessorKey: "product.seller_sku",
  //   header: "Seller SKU",
  // },
  {
    accessorKey: "quantity",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Quantity" />;
    },
  },
  {
    accessorKey: "available_quantity",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Available" />;
    },
  },
  // {
  //   accessorKey: "warehouse_location",
  //   header: "Warehouse Location",
  // },
  {
    accessorKey: "actions",
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <StorageActionsCell
        row={row}
        addProductToShipment={addProductToShipment}
      />
    ),
  },
];
