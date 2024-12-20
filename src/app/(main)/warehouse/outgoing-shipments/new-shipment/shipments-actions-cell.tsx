"use client";
import AddButton from "@/components/svgs/AddButton";
import { Row } from "@tanstack/react-table";
import { Product, StorageProduct } from "./interfaces";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useState } from "react";
import { DeleteButton } from "@/components/svgs/DeleteButton";

interface ActionsCellProps {
  row: Row<Product>;
  addProductToShipment: (product: Product, quantity: number) => void;
}

export default function ShipmentsActionsCell({
  row,
  addProductToShipment,
}: ActionsCellProps) {
  const product = row.original;

  const [quantityAdded, setQuantityAdded] = useState(row.original.quantity);

  const handleSubmit = () => {
    addProductToShipment(product, quantityAdded);
  };

  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (parseInt(event.target.value) > row.original.quantity) {
      toast.error("Quantity cannot be greater than quantity available");
      setQuantityAdded(0);
    } else {
      setQuantityAdded(parseInt(event.target.value, 10));
    }
  };

  return (
    // center the dialog into the center of the screen
    <Dialog>
      <DialogTrigger asChild className="">
        <Button type="submit" className="bg-transparent hover:bg-transparent">
          <DeleteButton color="#FF4C3F" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <DialogHeader>
          <DialogTitle>Remove Quantity</DialogTitle>
          <DialogDescription>
            How many items would you like to remove?
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="quantity" className="sr-only">
              Link
            </Label>
            <Input
              id="quantity"
              type="number"
              defaultValue={quantityAdded}
              max={row.original.quantity}
              onChange={handleQuantityChange}
            />
          </div>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="submit" variant="default" onClick={handleSubmit}>
              Confirm
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
