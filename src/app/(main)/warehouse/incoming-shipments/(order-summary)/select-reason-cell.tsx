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
};

export function SelectReasonCell({ row }: SelectReasonCellProps) {
  const { addReasonToPOProduct } = useOrdersContext();

  console.log(row);

  const handleReasonChange = (value: string) => {
    // setReason(value);
    addReasonToPOProduct(row.purchase_order_product_id, parseInt(value));
  };

  const getDefaultValue = (row: any) => {
    switch (row.reason_id) {
      case 1:
        return "Ok";
      case 2:
        return "Shortage";
      case 3:
        return "Broken Items";
      case 4:
        return "Not Shipped";
      case 5:
        return "Wrong Items";
      default:
        return "Ok";
    }
  };

  return (
    <Select
      defaultValue={row.reason_id?.toString() || "0"}
      onValueChange={(value) => {
        handleReasonChange(value);
        console.log(value);
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
