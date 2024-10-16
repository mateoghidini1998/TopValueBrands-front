"use client";

import { Badge } from "@/components/ui/badge"; // Puedes agregar estilos a tus badges
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header";
import { IPurchaseOrder } from "@/types/product.types";
import { ColumnDef } from "@tanstack/react-table";
import ActionsCell from "./actions-cell";
import StatusCell from "./status-cell";

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
    accessorKey: "createdAt",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Date" />;
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
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const availableStatuses = [
        "PENDING",
        "IN_TRANSIT",
        "GOOD_TO_GO",
        "REJECTED",
        "WAITING_FOR_SUPPLIER_APPROVAL",
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