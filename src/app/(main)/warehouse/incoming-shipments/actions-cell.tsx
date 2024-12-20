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
  const {
    downloadOrder,
    deleteOrder,
    setProductsAddedToCreatePallet,
    setProductsAvaliableToCreatePallet,
  } = useOrdersContext(); // Función de limpieza en el contexto
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const incomingOrder = row.original;

  const handleViewDetails = () => {
    setIsDialogOpen(true);
  };

  const handleDialogChange = (open: boolean) => {
    setIsDialogOpen(open);
    console.log(open);
    if (!open) {
      setProductsAddedToCreatePallet([]); // Llama a la función de limpieza al cerrar el diálogo
      setProductsAvaliableToCreatePallet([]); // Llama a la función de limpieza al cerrar el diálogo
    }
  };

  return (
    <div className="flex items-center justify-end gap-2">
      <Dialog open={isDialogOpen} onOpenChange={handleDialogChange}>
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

        <OrderSummary order={incomingOrder} />
      </Dialog>
    </div>
  );
};

export default ActionsCell;
