"use client";

import AddButton from "@/components/svgs/AddButton";
import { useOrdersContext } from "@/contexts/orders.context";
import classNames from "classnames";
import { useState } from "react";
import { toast } from "sonner";

export const AddProductToPalletBtn = ({ row }: any) => {
  const { setProductsAddedToCreatePallet } = useOrdersContext();
  const [isAdded, setIsAdded] = useState(false);

  return (
    <button
      className="btn btn-primary"
      onClick={() => {
        setProductsAddedToCreatePallet((prev) => {
          const product = prev.find(
            (p) =>
              p.purchase_order_product_id ===
              row.original.purchase_order_product_id
          );

          if (!product) {
            if (row.original.quantity_available === 0) {
              toast.error("Product out of stock");
              return [...prev];
            }

            return [
              ...prev,
              {
                product_name: row.original.product_name,
                product_image: row.original.product_image,
                ASIN: row.original.ASIN,
                seller_sku: row.original.seller_sku,
                purchase_order_product_id:
                  row.original.purchase_order_product_id,
                quantity: 0,
              },
            ];
          } else {
            toast.error("Product already added to order");
            return prev;
          }
        });
        setIsAdded(!isAdded);
      }}
    >
      {
        <AddButton
          className={classNames("h-4 w-4", {
            "bg-emerald-500": isAdded,
          })}
        />
      }
    </button>
  );
};
