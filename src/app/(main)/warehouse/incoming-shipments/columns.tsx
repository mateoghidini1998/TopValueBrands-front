"use client";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useOrdersContext } from "@/contexts/orders.context";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { useState } from "react";
import { OutgoingOrderType } from "../types/outgoing-order.type";

const availableStatuses = [
  "PENDING",
  "ARRIVED",
  "CANCELLED",
  "REJECTED",
  "IN_TRANSIT",
  "CLOSED",
  "WAITING_FOR_SUPPLIER_APPROVAL",
  "GOOD_TO_GO",
];
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
    cell: ({ row }) => {
      const rowItem = row.original;
      const [isEditing, setIsEditing] = useState(false);
      const { updateOrderStatus } = useOrdersContext();
      const currentStatus: string = row.getValue("status");

      const getBadgeVariant = (status: string) => {
        if (status === "PENDING") {
          return "pending";
        } else if (status === "ARRIVED") {
          return "arrived";
        } else if (status === "CANCELLED") {
          return "cancelled";
        } else if (status === "REJECTED") {
          return "rejected";
        } else if (status === "IN_TRANSIT") {
          return "in_transit";
        } else if (status === "CLOSED") {
          return "closed";
        } else if (status === "WAITING_FOR_SUPPLIER_APPROVAL") {
          return "waiting_for_supplier_approval";
        } else if (status === "GOOD_TO_GO") {
          return "good_to_go";
        } else {
          return "default";
        }
      };

      const handleStatusChange = (newStatus: string) => {
        setIsEditing(false); // Ocultar el Select después de cambiar el status
        updateOrderStatus(rowItem.id, newStatus);
      };

      return (
        <div>
          {isEditing ? (
            // Renderizamos el Select si isEditing es true
            <Select
              onValueChange={(newStatus) => handleStatusChange(newStatus)}
              value={currentStatus}
              open
              onOpenChange={() => setIsEditing(false)} // Al cerrar el Select, deshabilita el modo edición
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Change status" />
              </SelectTrigger>
              <SelectContent>
                {availableStatuses.map((status) => (
                  <SelectItem key={status} value={status}>
                    <Badge
                      className={"cursor-pointer"}
                      variant={getBadgeVariant(status)}
                    >
                      {status}
                    </Badge>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ) : (
            // Renderizamos el Badge si isEditing es false
            <Badge
              variant={getBadgeVariant(currentStatus)}
              className={`cursor-pointer`}
              onClick={() => setIsEditing(true)} // Al hacer clic, habilita el modo edición
            >
              {currentStatus}
            </Badge>
          )}
        </div>
      );
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
    cell: ({ row }) => {
      const outgoingOrder = row.original;

      return (
        <div className="flex items-center justify-end gap-2">
          <DropdownMenu key={outgoingOrder.id}>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => console.log("Copy payment ID")}>
                Copy payment ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => alert("Clicking View Customer ")}
              >
                View customer
              </DropdownMenuItem>
              <DropdownMenuItem>View payment details</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
