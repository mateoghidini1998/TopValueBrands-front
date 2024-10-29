"use client";

import AddButton from "@/components/svgs/AddButton";
import { useOrdersContext } from "@/contexts/orders.context";

export const AddProductToPalletBtn = ({ row }: any) => {
  const { setProductsAddedToCreatePallet } = useOrdersContext();

  return (
    <button
      className="btn btn-primary"
      onClick={() =>
        setProductsAddedToCreatePallet((prev) => {
          return [...prev, row.original];
        })
      }
    >
      <AddButton />
    </button>
  );
};
