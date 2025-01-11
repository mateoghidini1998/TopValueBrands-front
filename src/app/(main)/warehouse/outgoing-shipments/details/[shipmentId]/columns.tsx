"use client";

import { ColumnDef } from "@tanstack/react-table";
import { PalletProduct } from "../../interfaces";
import ActionsCell from "./actions-cell";
import { ProductNameTableData } from "@/components/inventory/ProductNameTableData";

export const columns: ColumnDef<PalletProduct>[] = [
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
    accessorKey: "pallet_number",
    header: "Pallet",
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
  },
  {
    accessorKey: "OutgoingShipmentProduct.quantity",
    header: "Outgoing Shipment Quantity",
    cell: ({ row }) => {
      // console.log(row.original);
      return (
        <div>
          {row.original.OutgoingShipmentProduct?.quantity || "no existe"}
        </div>
      );
    },
  },
  {
    accessorKey: "actions",
    id: "actions",
    header: () => <div className="text-right">Actions</div>,
    cell: ({ row }) => <ActionsCell row={row} />,
  },
];
