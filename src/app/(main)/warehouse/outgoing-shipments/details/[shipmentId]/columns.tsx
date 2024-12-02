"use client";

import { ColumnDef } from "@tanstack/react-table";
import { PalletProduct } from "../../interfaces";
import ActionsCell from "./actions-cell";
import { ProductNameTableData } from "@/components/inventory/ProductNameTableData";

export const columns: ColumnDef<PalletProduct>[] = [
  // {
  //   accessorKey: "order_number",
  //   header: "Order Number",
  // },

  {
    accessorKey: "product_name",
    header: "Product",
    cell: ({ row }) => (
      <ProductNameTableData product={row.original} width={250} />
    ),
  },
  {
    accessorKey: "seller_sku",
    header: "Seller SKU",
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
  },
  {
    accessorKey: "available_quantity",
    header: "Available Quantity",
  },
  {
    accessorKey: "outgoing_shipment_quantity",
    header: "Outgoing Shipment Quantity",
    cell: ({ row }) => {
      return <div>{row.original.OutgoingShipmentProduct.quantity}</div>;
    },
  },
  {
    accessorKey: "actions",
    id: "actions",
    header: () => <div className="text-right">Actions</div>,
    cell: ({ row }) => <ActionsCell row={row} />,
  },
];
