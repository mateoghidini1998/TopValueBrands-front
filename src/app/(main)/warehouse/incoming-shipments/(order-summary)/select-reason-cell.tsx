"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useOrdersContext } from "@/contexts/orders.context";

type SelectReasonCellProps = {
  row: any;
  setLocalData: (value: any) => any;
};

export function SelectReasonCell({ row, setLocalData }: SelectReasonCellProps) {
  const { addReasonToPOProduct } = useOrdersContext();
  const handleReasonChange = (value: string) => {
    addReasonToPOProduct(
      row.original.purchase_order_product_id,
      parseInt(value)
    );
    setLocalData((prev: any) => {
      return prev.map((product: any) => {
        if (
          product.purchase_order_product_id ===
          row.original.purchase_order_product_id
        ) {
          return {
            ...product,
            reason_id: parseInt(value),
          };
        }
        return product;
      });
    });
  };

  return (
    <Select
      defaultValue={row.original.reason_id?.toString() || "0"}
      onValueChange={(value) => {
        handleReasonChange(value);
      }}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a reason" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Reasons</SelectLabel>
          <SelectItem value="0">None</SelectItem>
          <SelectItem value="1">Ok</SelectItem>
          <SelectItem value="2">Shortage</SelectItem>
          <SelectItem value="3">Broken Items</SelectItem>
          <SelectItem value="4">Not Shipped</SelectItem>
          <SelectItem value="5">Wrong Items</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
