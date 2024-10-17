/* eslint-disable @next/next/no-img-element */
import { TrackedProductType } from "@/types/trackedProducts.types";
import { ColumnDef } from "@tanstack/react-table";
import ActionsCell from "./actions-cell";
import QuantityReceivedCell from "./quantity-received-cell";
// import NotesCell from "./notes-cell";

export const columns: ColumnDef<TrackedProductType>[] = [
  // {
  //   accessorKey: "order_number",
  //   header: "Order Number",
  // },
  // {
  //   accessorKey: "order_id",
  //   header: "Order ID",
  // },
  {
    accessorKey: "product_name",
    header: "Product Name",
    cell: ({ row }) => {
      console.log(row.original);

      return (
        <div className="w-[200px] flex items-center gap-2">
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
    cell: ({ row }) => <QuantityReceivedCell row={row} />,
  },
  {
    accessorKey: "quantity_missing",
    header: "Quantity Missing",
  },
  {
    accessorKey: "reason_id",
    header: "Reason",
  },
  // {
  //   accessorKey: "purchase_order_product_notes",
  //   header: "Notes",
  //   cell: ({ row }) => {
  //     return <NotesCell row={row.original} />;
  //   },
  // },
  // {
  //   accessorKey: "actions",
  //   id: "actions",
  //   header: () => <div className="text-right">Actions</div>,
  //   cell: ({ row }) => <ActionsCell row={row} />,
  // },
];
