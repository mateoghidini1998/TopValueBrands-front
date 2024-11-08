/* eslint-disable @next/next/no-img-element */
import { ColumnDef } from "@tanstack/react-table";
import AddQuantityToPalletCell from "./add-quantity-to-pallet-cell";
import { RemoveProductToPalletBtn } from "./remove-product-to-pallet-btn";
// import NotesCell from "./notes-cell";

interface CreatePalletProps {
  product_name: string;
  product_image: string;
  ASIN: string;
  seller_sku: string;
  quantity: number;
  purchase_order_product_id: number;
}

export const columnsCreatePallet: ColumnDef<CreatePalletProps>[] = [
  {
    accessorKey: "product_name",
    header: "Product Name",
    cell: ({ row }) => {
      return (
        <div className="w-[300px] flex items-center gap-2">
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
    accessorKey: "quantity",
    header: "Quantity",
    cell: ({ row }) => (
      <AddQuantityToPalletCell
        purchaseOrderProductId={row.original.purchase_order_product_id}
      />
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return <RemoveProductToPalletBtn row={row} />;
    },
  },
];
