/* eslint-disable @next/next/no-img-element */
import { ColumnDef } from "@tanstack/react-table";
import QuantityReceivedCell from "./quantity-received-cell";
import { DatePickerCell } from "./date-picker-cell";
import { SelectReasonCell } from "./select-reason-cell";
import { Input } from "@/components/ui/input";
import { ProductNameTableData } from "@/components/inventory/ProductNameTableData";
import AddUPCCell from "./add-upc-cell";
// import NotesCell from "./notes-cell";

export interface IncomingShipmentsOrderSummaryProps {
  product_name: string;
  product_image: string;
  ASIN: string;
  seller_sku: string;
  order_id: string;
  order_number: string;
  supplier_name: string;
  quantity: number;
  quantity_missing: number;
  expire_date: string;
}

export const getColumns = (
  setLocalData: any
): ColumnDef<IncomingShipmentsOrderSummaryProps>[] => [
  {
    accessorKey: "product_name",
    header: "Product Name",
    cell: ({ row }) => {
      return (
        // <div className="w-[200px] flex items-center gap-2">
        //   <img
        //     className="h-10 w-10 rounded-md"
        //     src={row.original.product_image}
        //     alt={row.original.product_name}
        //   />
        //   {row.original.product_name}
        // </div>
        <ProductNameTableData product={row.original} width={200} />
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
    accessorKey: "UPC",
    header: "UPC",
    cell: ({ row }) => <AddUPCCell row={row} />,
  },
  {
    accessorKey: "quantity_purchased",
    header: "Quantity Purchased",
  },
  {
    accessorKey: "quantity_received",
    header: "Quantity Received",
    cell: ({ row }) => (
      <QuantityReceivedCell row={row} setLocalData={setLocalData} />
    ),
  },
  {
    accessorKey: "quantity_missing",
    header: "Quantity Missing",
    cell: ({ row }) => <span>{row.original.quantity_missing}</span>,
  },
  {
    accessorKey: "reason_id",
    header: "Reason",
    cell: ({ row }) => (
      <SelectReasonCell row={row} setLocalData={setLocalData} />
    ),
  },
  {
    accessorKey: "expire_date",
    header: "Expire Date",
    cell: ({ row }) => <DatePickerCell row={row.original} />,
  },
];
