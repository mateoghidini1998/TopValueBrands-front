"use client";

import { DeleteButton } from "@/components/svgs/DeleteButton";
import { useOrdersContext } from "@/contexts/orders.context";

export const RemoveProductToPalletBtn = ({ row }: any) => {
  const { setProductsAddedToCreatePallet } = useOrdersContext();
  return (
    <button
      className="btn btn-primary"
      onClick={() =>
        setProductsAddedToCreatePallet((prev) => {
          return prev.filter(
            (p) =>
              p.purchase_order_product_id !==
              row.original.purchase_order_product_id
          );
        })
      }
    >
      <DeleteButton color="white" />
    </button>
  );
};
