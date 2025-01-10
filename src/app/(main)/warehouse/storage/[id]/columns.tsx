"use client";

import { DataTableColumnHeader } from "@/components/ui/data-table-column-header";
import DateCell from "@/components/ui/data-table-date-cell";
import { ColumnDef } from "@tanstack/react-table";
import { PalletProduct } from "./types/interfaces";
import { ProductNameTableData } from "@/components/inventory/ProductNameTableData";
import ActionsCell from "./actions-cell";

export const columns: ColumnDef<PalletProduct>[] = [
  {
    accessorKey: "product_name",
    header: "Product",
    cell: ({ row }) => {
      return (
        <ProductNameTableData
          product={row.original.purchaseOrderProduct.Product}
          width={250}
        />
      );
    },
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
  },

  {
    accessorKey: "available_quantity",
    header: "Available",
  },

  {
    accessorKey: "seller_sku",
    header: "Seller SKU",
  },

  {
    accessorKey: "updatedAt",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Date" />;
    },
    cell: ({ row }) => {
      return <DateCell value={row.original.updatedAt} />;
    },
  },
  // actions
  {
    accessorKey: "actions",
    id: "actions",
    header: () => <div className="text-right">Actions</div>,
    cell: ({ row }) => <ActionsCell row={row} />,
  },
];
