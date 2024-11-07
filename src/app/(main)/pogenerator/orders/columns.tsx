"use client";

import { Badge } from "@/components/ui/badge"; // Puedes agregar estilos a tus badges
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header";
import DateCell from "@/components/ui/data-table-date-cell";
import StatusCell from "@/components/ui/data-table-status-cell";
import { IPurchaseOrder } from "@/types/product.types";
import { ColumnDef } from "@tanstack/react-table";
import ActionsCell from "./actions-cell";

export const columns: ColumnDef<IPurchaseOrder>[] = [
  {
    accessorKey: "supplier_name",
    header: "Supplier",
  },
  {
    accessorKey: "order_number",
    header: "Order Number",
  },
  {
    accessorKey: "updatedStatusAt",
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
    accessorKey: "notes",
    header: "Notes",
    cell: ({ row }) => (
      <div className="max-w-xs overflow-hidden text-ellipsis">
        {row.getValue("notes")}
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const availableStatuses = [
        "Pending",
        "In transit",
        "Good to go",
        "Rejected",
        "Waiting for supplier approval",
      ];
      return <StatusCell row={row} avaliableStatuses={availableStatuses} />;
    },
  },
  {
    accessorKey: "average_roi",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="AVG ROI" />;
    },
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("average_roi")).toFixed(2);

      const getBadgeVariant = (amount: number) => {
        if (amount >= 2) {
          return "success";
        }

        if (amount <= 0) {
          return "danger";
        }

        return "warning";
      };

      return (
        <Badge
          variant={getBadgeVariant(parseFloat(amount))}
          className={`cursor-pointer`}
        >
          {amount}
        </Badge>
      );
    },
  },
  {
    accessorKey: "actions",
    id: "actions",
    header: () => <div className="text-right">Actions</div>,
    cell: ({ row }) => <ActionsCell row={row} />,
  },
];
