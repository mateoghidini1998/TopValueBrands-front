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
    accessorKey: "createdAt",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Date" />;
    },
    cell: ({ row }) => {
      return <DateCell value={row.original.updatedAt} />;
    },
  },
  {
    accessorKey: "total_price",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Total" />;
    },
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("total_price"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return <div className="">{formatted}</div>;
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
    accessorKey: "notes",
    header: "Notes",
  },
  {
    accessorKey: "actions",
    id: "actions",
    header: () => <div className="text-right">Actions</div>,
    cell: ({ row }) => <ActionsCell row={row} />,
  },
];
