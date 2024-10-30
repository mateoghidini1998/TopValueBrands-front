"use client";

import DeleteIcon from "@/components/svgs/DeleteIcon";
import { useOrdersContext } from "@/contexts/orders.context";

export const RemoveProductToPalletBtn = ({ row }: any) => {
  const { setProductsAddedToCreatePallet, setProductsAvaliableToCreatePallet } =
    useOrdersContext();

  return (
    <button
      className="btn btn-primary"
      onClick={() => {
        // Primero eliminamos el producto de `productsAddedToCreatePallet`
        setProductsAddedToCreatePallet((prev) => {
          return prev.filter(
            (p) =>
              p.purchase_order_product_id !==
              row.original.purchase_order_product_id
          );
        });

        // Luego, restauramos la cantidad en `productsAvaliableToCreatePallet`
        setProductsAvaliableToCreatePallet((prev) => {
          // Encuentra el producto en `prev` usando `purchase_order_product_id`
          return prev.map((p) => {
            if (
              p.purchase_order_product_id ===
              row.original.purchase_order_product_id
            ) {
              return {
                ...p,
                quantity_available:
                  p.quantity_available + row.original.quantity,
              };
            }
            return p;
          });
        });
      }}
    >
      <DeleteIcon />
    </button>
  );
};
