"use client";

import { ProductNameTableData } from "@/components/inventory/ProductNameTableData";
import { ColumnDef } from "@tanstack/react-table";
import { StorageProduct } from "./interfaces";
import StorageActionsCell from "./storage-actions-cell";
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header";
import ShipmentsActionsCell from "./shipments-actions-cell";

export const getShipmentsCols = (
  removeProductFromShipment: any
): ColumnDef<StorageProduct>[] => [
  {
    accessorKey: "pallet_number",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Pallet Number" />;
    },
    cell: ({ row }) => `#${row.original.pallet_number}`,
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
    accessorKey: "product.ASIN",
    header: "ASIN",
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
  // {
  //   accessorKey: "available_quantity",
  //   header: ({ column }) => {
  //     return (
  //       <DataTableColumnHeader column={column} title="Quantity Available" />
  //     );
  //   },
  // },
  // {
  //   accessorKey: "warehouse_location",
  //   header: "Warehouse Location",
  // },
  {
    accessorKey: "actions",
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <ShipmentsActionsCell
        row={row}
        addProductToShipment={removeProductFromShipment}
      />
    ),
  },
];
