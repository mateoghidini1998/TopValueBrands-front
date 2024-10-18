"use client";
import AddButton from "@/components/svgs/AddButton";
import {
  TrackedProductsProvider,
  useTrackedProductContext,
} from "@/contexts/trackedProducts.context";
type AddToOrderCellProps = {
  row: any;
};

export default function AddToOrderCell({ row }: AddToOrderCellProps) {
  const { addTrackedProductToOrder } = useTrackedProductContext();

  return (
    <span
      className="flex items-right justify-end cursor-pointer"
      onClick={() => addTrackedProductToOrder(row.original)}
    >
      <AddButton />
    </span>
  );
}
