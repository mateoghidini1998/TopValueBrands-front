/* eslint-disable @next/next/no-img-element */
import { ColumnDef } from "@tanstack/react-table";
import { AddProductToPalletBtn } from "./add-product-to-pallet-btn";
// import NotesCell from "./notes-cell";

interface AvaliablePalletProps {
  product_name: string;
  product_image: string;
  ASIN: string;
  seller_sku: string;
  quantity_received: number;
}

export const columnsAvaliablePallet: ColumnDef<AvaliablePalletProps>[] = [
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
    accessorKey: "quantity_available",
    header: "Quantity Avaliable",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return <AddProductToPalletBtn row={row} />;
    },
  },
];
