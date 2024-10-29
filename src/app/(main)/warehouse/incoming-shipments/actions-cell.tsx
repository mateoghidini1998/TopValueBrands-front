// src/components/StatusCell.tsx
"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useOrdersContext } from "@/contexts/orders.context";
import { MoreHorizontal } from "lucide-react";
import OrderSummary from "./(order-summary)/order-summary";
import { useState } from "react";

type ActionsCellProps = {
  row: any;
};

const ActionsCell = ({ row }: ActionsCellProps) => {
  const { downloadOrder, deleteOrder } = useOrdersContext();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const incomingOrder = row.original;

  const handleViewDetails = () => {
    setIsDialogOpen(true);
  };

  return (
    <div className="flex items-center justify-end gap-2">
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DropdownMenu key={incomingOrder.id}>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={handleViewDetails} className="w-full">
              View Details
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => downloadOrder(incomingOrder.id)}>
              Download PDF
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => deleteOrder(incomingOrder.id)}>
              Delete Order
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DialogContent aria-describedby="Order Summary">
          <DialogTitle>Order Summary</DialogTitle>
          <OrderSummary order={incomingOrder} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ActionsCell;
