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
  quantity_purchased: number;
  expire_date: string;
}

export const getColumns = (
  setLocalData: any
): ColumnDef<IncomingShipmentsOrderSummaryProps>[] => [
  {
    accessorKey: "product_name",
    header: () => {
      return (
        <span className="flex items-center justify-center w-full">
          Product Name
        </span>
      );
    },
    cell: ({ row }) => {
      return <ProductNameTableData product={row.original} width={200} />;
    },
  },
  {
    accessorKey: "ASIN",
    header: () => {
      return (
        <span className="flex items-center justify-center w-full">ASIN</span>
      );
    },
    cell: ({ row }) => (
      <span className=" flex items-center justify-center w-full">
        {row.original.ASIN}
      </span>
    ),
  },
  {
    accessorKey: "seller_sku",
    header: () => {
      return (
        <span className="flex items-center justify-center w-full">
          Seller SKU
        </span>
      );
    },
    cell: ({ row }) => (
      <span className=" flex items-center justify-center w-full">
        {row.original.seller_sku}
      </span>
    ),
  },
  {
    accessorKey: "UPC",
    header: () => {
      return (
        <span className="flex items-center justify-center w-full">UPC</span>
      );
    },
    cell: ({ row }) => {
      return (
        <span className=" flex items-center justify-center w-full">
          <AddUPCCell row={row} />
        </span>
      );
    },
  },
  {
    accessorKey: "quantity_purchased",
    header: () => {
      return (
        <span className="flex items-center justify-center w-full">
          Quantity Purchased
        </span>
      );
    },
    cell: ({ row }) => (
      <span className=" flex items-center justify-center w-full">
        {row.original.quantity_purchased}
      </span>
    ),
  },
  {
    accessorKey: "quantity_received",
    header: () => {
      return (
        <span className="flex items-center justify-center w-full">
          Quantity Received
        </span>
      );
    },
    cell: ({ row }) => (
      <span className=" flex items-center justify-center w-full">
        <QuantityReceivedCell row={row} setLocalData={setLocalData} />
      </span>
    ),
  },
  {
    accessorKey: "quantity_missing",
    header: () => {
      return (
        <span className="flex items-center justify-center w-full">
          Quantity Missing
        </span>
      );
    },
    cell: ({ row }) => (
      <span className=" flex items-center justify-center w-full">
        {row.original.quantity_missing}
      </span>
    ),
  },
  {
    accessorKey: "reason_id",
    header: () => {
      return (
        <span className="flex items-center justify-center w-full">Reason</span>
      );
    },
    cell: ({ row }) => (
      <span className=" flex items-center justify-center w-full">
        <SelectReasonCell row={row} setLocalData={setLocalData} />
      </span>
    ),
  },
  {
    accessorKey: "expire_date",
    header: () => {
      return (
        <span className="flex items-center justify-center w-full">
          Expire Date
        </span>
      );
    },
    cell: ({ row }) => {
      return (
        <span className=" flex items-center justify-center w-full">
          <DatePickerCell row={row.original} />
        </span>
      );
    },
  },
];
