"use client";

import { Button } from "@/components/ui/button";
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
import { OutgoingOrderType } from "./types/outgoing-order.type";
import { OrderTags } from "@/components/ui/OrderTags";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge"; // Puedes agregar estilos a tus badges
import { useState } from "react";
import { useOrdersContext } from "@/contexts/orders.context";

const statusColors: Record<string, string> = {
  PENDING: "bg-yellow-500 text-white",
  ARRIVED: "bg-green-500 text-white",
  CANCELLED: "bg-red-500 text-white",
  REJECTED: "bg-red-500 text-white",
  IN_TRANSIT: "bg-blue-500 text-white",
  CLOSED: "bg-gray-500 text-white",
  WAITING_FOR_SUPPLIER_APPROVAL: "bg-gray-500 text-white",
  GOOD_TO_GO: "bg-gray-500 text-white",
};

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
    header: "Date",
  },
  {
    accessorKey: "total_price",
    header: "Total",
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
      const [isEditing, setIsEditing] = useState(false);
      const currentStatus: string = row.getValue("status");

      const handleStatusChange = (newStatus: string) => {
        setIsEditing(false); // Ocultar el Select después de cambiar el status
        handleStatusUpdate(row.original.id, newStatus); // Aquí llamamos a la función para actualizar el status
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
                    <Badge className={statusColors[status]}>{status}</Badge>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ) : (
            // Renderizamos el Badge si isEditing es false
            <Badge
              className={`cursor-pointer ${statusColors[currentStatus]}`}
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
    accessorKey: "avg_roi",
    header: "AVG ROI",
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

// Función para manejar la actualización del status
const handleStatusUpdate = (orderId: number, newStatus: string) => {
  // Lógica para actualizar el status de la orden
  alert(`Order ${orderId} status updated to ${newStatus}`);
};
