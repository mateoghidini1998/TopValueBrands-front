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
import { Dispatch, SetStateAction } from "react";
import { TrackedProductType } from "@/types/trackedProducts.types";

type ActionsCellProps = {
  row: TrackedProductType;
  setTrackedProductsData: Dispatch<SetStateAction<TrackedProductType[]>>;
  deleteProductFromOrder: (purchaseOrderProductId: number) => void;
};

const AnalyzeActionsCell = ({
  row,
  setTrackedProductsData,
  deleteProductFromOrder,
}: ActionsCellProps) => {
  console.log(row);

  const handleDeleteProductFromOrder = (purchaseOrderProductId: number) => {
    try {
      deleteProductFromOrder(purchaseOrderProductId);
      setTrackedProductsData((prevData) =>
        prevData.filter(
          (product) =>
            product.purchase_order_product_id !== purchaseOrderProductId
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex items-center justify-end gap-2">
      <Dialog>
        <DropdownMenu key={1}>
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
            <DropdownMenuItem onClick={() => console.log("clicked")}>
              Download PDF
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() =>
                handleDeleteProductFromOrder(row.purchase_order_product_id!!)
              }
            >
              Delete Product
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Dialog for View Details */}
        {/* <OrderSummary orderId={1} /> */}
      </Dialog>
    </div>
  );
};

export default AnalyzeActionsCell;
