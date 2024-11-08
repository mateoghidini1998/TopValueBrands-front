// src/components/StatusCell.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
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
import OrderSummary from "./order-summary";
import CustomAlertDialog from "../../../../components/ui/custom-alert-dialog";
import { useState } from "react";

type ActionsCellProps = {
  row: any;
};

const ActionsCell = ({ row }: ActionsCellProps) => {
  const { downloadOrder, deleteOrder } = useOrdersContext();

  const [isOrderSummaryOpen, setIsOrderSummaryOpen] = useState(false);

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
              <DropdownMenuItem
                className="w-full"
                onClick={() => setIsOrderSummaryOpen(true)}
              >
                View Details
              </DropdownMenuItem>
            </DialogTrigger>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => downloadOrder(incomingOrder.id)}>
              Download PDF
            </DropdownMenuItem>
            {/* <DropdownMenuItem> */}
            <CustomAlertDialog
              text="Delete Order"
              confirmAction={() => deleteOrder(incomingOrder.id)}
            />
            {/* Delete Order */}
            {/* </DropdownMenuItem> */}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Dialog for View Details */}
        {isOrderSummaryOpen && <OrderSummary orderId={incomingOrder.id} />}
      </Dialog>
    </div>
  );
};

export default ActionsCell;
