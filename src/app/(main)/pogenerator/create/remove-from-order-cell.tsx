"use client";
import DeleteIcon from "@/components/svgs/DeleteIcon";
import { useTrackedProductContext } from "@/contexts/trackedProducts.context";
type RemoveFromOrderCellProps = {
  row: any;
};

export default function RemoveFromOrderCell({ row }: RemoveFromOrderCellProps) {
  const { removeTrackedProductFromOrder } = useTrackedProductContext();

  return (
    <span
      className="flex items-right justify-end cursor-pointer"
      onClick={() => removeTrackedProductFromOrder(row.original)}
    >
      <DeleteIcon />
    </span>
  );
}
