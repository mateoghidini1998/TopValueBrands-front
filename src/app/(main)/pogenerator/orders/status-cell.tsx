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

type StatusCellProps = {
  row: any;
  avaliableStatuses: string[];
};

const StatusCell = ({ row, avaliableStatuses }: StatusCellProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const { updateOrderStatus } = useOrdersContext();
  const currentStatus = row.getValue("status");

  const getBadgeVariant = (status: string) => {
    if (status === "Pending") {
      return "Pending";
    } else if (status === "Arrived") {
      return "Arrived";
    } else if (status === "Cancelled") {
      return "Cancelled";
    } else if (status === "Rejected") {
      return "Rejected";
    } else if (status === "In transit") {
      return "In transit";
    } else if (status === "Closed") {
      return "Closed";
    } else if (status === "Waiting for supplier approval") {
      return "Waiting for supplier approval";
    } else if (status === "Good to go") {
      return "Good to go";
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
            {avaliableStatuses.map((status) => (
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
