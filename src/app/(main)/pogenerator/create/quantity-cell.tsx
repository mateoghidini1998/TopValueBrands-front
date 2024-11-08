import { Input } from "@/components/ui/input";
import {
  ProductInOrder,
  useTrackedProductContext,
} from "@/contexts/trackedProducts.context";
import { ChangeEvent } from "react";

type QuantityCellProps = {
  row: any;
};

export default function QuantityCell({ row }: QuantityCellProps) {
  const { updateTrackedProductInOrder } = useTrackedProductContext();

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement>,
    row: ProductInOrder,
    key: string
  ) => {
    const newValue = parseFloat(event.target.value);
    const updatedRow = {
      ...row,
      [key]: newValue,
    };
    updatedRow.total_amount = updatedRow.quantity * updatedRow.unit_price;
    updateTrackedProductInOrder(updatedRow);
  };

  return (
    <Input
      className="w-24 text-xs"
      type="number"
      defaultValue={row.quantity}
      onChange={(event) => handleInputChange(event, row, "quantity")}
    />
  );
}
