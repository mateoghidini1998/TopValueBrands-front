"use client";

import { DataTableColumnHeader } from "@/components/ui/data-table-column-header";
import { Shipment } from "./interfaces";
import { ColumnDef } from "@tanstack/react-table";
import DateCell from "@/components/ui/data-table-date-cell";
import ActionsCell from "./actions-cell";

export const columns: ColumnDef<Shipment>[] = [
  {
    accessorKey: "shipment_number",
    header: "Shipment Number",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "updatedAt",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Date" />;
    },
    cell: ({ row }) => {
      return <DateCell value={row.original.updatedAt.toString()} />;
    },
  },
  {
    accessorKey: "actions",
    id: "actions",
    header: () => <div className="text-right">Actions</div>,
    cell: ({ row }) => <ActionsCell row={row} />,
  },
];
