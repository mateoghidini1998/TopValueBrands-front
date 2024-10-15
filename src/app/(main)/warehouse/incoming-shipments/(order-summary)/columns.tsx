/* eslint-disable @next/next/no-img-element */
import { TrackedProductType } from "@/types/trackedProducts.types";
import { ColumnDef } from "@tanstack/react-table";
import ActionsCell from "./actions-cell";

export const columns: ColumnDef<TrackedProductType>[] = [
  {
    accessorKey: "product_name",
    header: "Product Name",
    cell: ({ row }) => {
      return (
        <div className="w-[250px] flex items-center gap-2">
          <img
            className="h-10 w-10 rounded-md"
            src={row.original.product_image}
            alt={row.original.product_name}
          />
          {row.original.product_name}
        </div>
      );
    },
  },
  {
    accessorKey: "ASIN",
    header: "ASIN",
  },
  {
    accessorKey: "seller_sku",
    header: "Seller SKU",
  },
  {
    accessorKey: "quantity_purchased",
    header: "Quantity Purchased",
  },
  {
    accessorKey: "quantity_received",
    header: "Quantity Received",
  },
  {
    accessorKey: "quantity_missing",
    header: "Quantity Missing",
  },
  {
    accessorKey: "reason_id",
    header: "Reason",
  },
  {
    accessorKey: "notes",
    header: "Notes",
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }) => <ActionsCell row={row} />,
  },
];
