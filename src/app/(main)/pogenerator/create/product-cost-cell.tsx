import { Input } from "@/components/ui/input";
import {
  ProductInOrder,
  useTrackedProductContext,
} from "@/contexts/trackedProducts.context";
import { ChangeEvent } from "react";

export default function ProductCostCell({ row }: any) {
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
    updatedRow.total_amount = updatedRow.quantity * updatedRow.product_cost;
    updateTrackedProductInOrder(updatedRow);
  };

  return (
    <Input
      className="w-24 text-xs"
      type="number"
      defaultValue={row.product_cost}
      onChange={(event) => handleInputChange(event, row, "product_cost")}
    />
  );
}
