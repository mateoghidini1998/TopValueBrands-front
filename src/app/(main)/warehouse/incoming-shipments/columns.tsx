"use client";

import { Dialog, DialogTrigger } from "@/components/ui/dialog";

import { Badge } from "@/components/ui/badge"; // Puedes agregar estilos a tus badges
import { Button } from "@/components/ui/button";
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { OutgoingOrderType } from "../types/outgoing-order.type";
import OrderSummary from "./order-summary";
import StatusCell from "./status-cell";

export const columns: ColumnDef<OutgoingOrderType>[] = [
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
    cell: ({ row }) => <StatusCell row={row} />,
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
    cell: ({ row }) => {
      const trackedProductsFieldsToShow = [
        "product_name",
        "ASIN",
        "seller_sku",
        "current_rank",
        "thirty_days_rank",
        "ninety_days_rank",
        "units_sold",
        "product_velocity",
        "product_cost",
      ];

      const purchasedOrderProductsFieldsToShow = [
        "quantity_purchased",
        "total_amount",
      ];

      const incomingOrder = row.original;
      return (
        <div className="flex items-center justify-end gap-2">
          <Dialog>
            <DropdownMenu key={incomingOrder.id}>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DialogTrigger asChild>
                  <DropdownMenuItem className="w-full">
                    View Details
                  </DropdownMenuItem>
                </DialogTrigger>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => alert("Clicking View Customer ")}
                >
                  View customer
                </DropdownMenuItem>
                <DropdownMenuItem>View payment details</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Dialog for View Details */}
            <OrderSummary
              order={incomingOrder}
              purchasedOrderProductsFieldsToShow={
                purchasedOrderProductsFieldsToShow
              }
              trackedProductsFieldsToShow={trackedProductsFieldsToShow}
            />
          </Dialog>
        </div>
      );
    },
  },
];
