"use client";

import { DataTableColumnHeader } from "@/components/ui/data-table-column-header";
import { IPurchaseOrder } from "@/types/product.types";
import { ColumnDef } from "@tanstack/react-table";
import ActionsCell from "./actions-cell";
import StatusCell from "@/components/ui/data-table-status-cell";
import DateCell from "@/components/ui/data-table-date-cell";

const availableStatuses = ["In transit", "Arrived", "Cancelled", "Closed"];

export const columns: ColumnDef<IPurchaseOrder>[] = [
  {
    accessorKey: "order_number",
    header: "Order Number",
  },
  {
    accessorKey: "supplier_name",
    header: "Supplier",
  },
  {
    accessorKey: "fba_shipment_id",
    header: "FBA Shipment ID",
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Date" />;
    },
    cell: ({ row }) => {
      return <DateCell value={row.original.updatedAt} />;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <StatusCell avaliableStatuses={availableStatuses} row={row} />
    ),
  },
  {
    accessorKey: "updatedAt",
    header: "Last Updated",
    cell: ({ row }) => {
      return <DateCell value={row.original.updatedAt} />;
    },
  },
  {
    accessorKey: "actions",
    id: "actions",
    header: () => <div className="text-right">Actions</div>,
    cell: ({ row }) => <ActionsCell row={row} />,
  },
];
