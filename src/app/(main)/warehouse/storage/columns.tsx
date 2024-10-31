"use client";

import { DataTableColumnHeader } from "@/components/ui/data-table-column-header";
import DateCell from "@/components/ui/data-table-date-cell";
import { ColumnDef } from "@tanstack/react-table";
import ActionsCell from "./actions-cell";

export const columns: ColumnDef<PalletType>[] = [
  {
    accessorKey: "pallet_number",
    header: "Pallet Number",
  },
  {
    accessorKey: "warehouse_location_id",
    header: "Warehouse Location",
  },
  {
    accessorKey: "purchase_order_id",
    header: "Purchase Order",
    cell: ({ row }) => {
      return <span>{row.original.purchase_order_id}</span>;
    },
  },

  {
    accessorKey: "updatedAt",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Date" />;
    },
    cell: ({ row }) => {
      return <DateCell value={row.original.updatedAt} />;
    },
  },
  {
    id: "actions",
    header: () => <div className="text-right">Actions</div>,
    cell: ({ row }) => <ActionsCell row={row} />,
  },
];
