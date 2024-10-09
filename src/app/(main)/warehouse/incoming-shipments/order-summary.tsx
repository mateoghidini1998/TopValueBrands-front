import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type OrderSummaryProps = {
  className?: string;
};

export default function OrderSummary() {
  return (
    <DialogContent className="flex flex-col gap-4 item-center justify-between">
      <DialogHeader className="flex flex-col items-center gap-4">
        <DialogTitle className="text-center">Order Summary</DialogTitle>

        {/* Products List */}
        <DialogDescription>
          <ScrollArea className="min-h-[400px] max-h-[700px] w-full rounded-md border p-4">
            This action cannot be undone. Are you sure you want to permanently
            delete this file from our servers?
          </ScrollArea>
        </DialogDescription>

        {/* Notes */}
        <DialogDescription className="flex flex-col gap-2 w-full">
          <h2>Notes</h2>
          <p>Description of the order summary</p>
        </DialogDescription>

        {/* Order Information */}
        <DialogDescription className="flex flex-col gap-2 w-full">
          <div className="flex justify-between items-center">
            <h2>Order Number</h2>
            <p>#25245</p>
          </div>

          <div className="flex justify-between items-center">
            <h2>Supplier</h2>
            <p>Supplier 1</p>
          </div>

          <div className="flex justify-between items-center">
            <h2>Date</h2>
            <p>05/06/2024</p>
          </div>

          <div className="flex justify-between items-center">
            <h2>Total</h2>
            <p>$1,5452.30</p>
          </div>
        </DialogDescription>

        <Separator className="my-4" />

        {/* Status */}
        <DialogDescription className="flex flex-col gap-2 w-full">
          <h2>Status</h2>
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a state" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {/* <SelectLabel>Fruits</SelectLabel> */}
                <SelectItem value="good_to_go">Good To Go</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </DialogDescription>
      </DialogHeader>

      {/* Dialog Footer */}
      <DialogFooter className="w-full flex flex-col gap-2 item-center justify-between">
        <Button className="w-full" type="submit">
          Confirm
        </Button>
        <Button className="w-full" type="submit">
          Discard
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}
