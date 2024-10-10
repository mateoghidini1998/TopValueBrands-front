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

type ActionsCellProps = {
  row: any;
};

const ActionsCell = ({ row }: ActionsCellProps) => {
  const { downloadOrder, deleteOrder } = useOrdersContext();

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
            <DropdownMenuItem onClick={() => downloadOrder(incomingOrder.id)}>
              Download PDF
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => deleteOrder(incomingOrder.id)}>
              Delete Order
            </DropdownMenuItem>
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
};

export default ActionsCell;
