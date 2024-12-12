"use client";

import { ProductNameTableData } from "@/components/inventory/ProductNameTableData";
import { ColumnDef } from "@tanstack/react-table";
import { Product, StorageProduct } from "./interfaces";
import StorageActionsCell from "./storage-actions-cell";
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header";
import ShipmentsActionsCell from "./shipments-actions-cell";

export const getShipmentsCols = (
  removeProductFromShipment: any
): ColumnDef<Product>[] => [
  {
    accessorKey: "seller_sku",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="SKU" />;
    },
    cell: ({ row }) => `${row.original.seller_sku}`,
  },
  {
    accessorKey: "product_name",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Product" />;
    },
    cell: ({ row }) => {
      return (
        <ProductNameTableData product={row.original} width={250} />
        // <p>{row.original.product.product_name}</p>
      );
    },
  },
  {
    accessorKey: "product.ASIN",
    header: "ASIN",
    cell: ({ row }) => <p>{row.original.ASIN}</p>,
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
