// src/components/StatusCell.tsx
"use client";

import React, { useState } from "react";
import { useOrdersContext } from "@/contexts/orders.context";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

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

const StatusCell = ({ row }: any) => {
  const [isEditing, setIsEditing] = useState(false);
  const { updateOrderStatus } = useOrdersContext();
  const currentStatus = row.getValue("status");

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
    setIsEditing(false);
    updateOrderStatus(row.original.id, newStatus);
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
};

export default StatusCell;
