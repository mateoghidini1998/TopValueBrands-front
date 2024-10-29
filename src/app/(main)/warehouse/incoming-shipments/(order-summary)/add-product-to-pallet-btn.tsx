"use client";

import AddButton from "@/components/svgs/AddButton";
import { useOrdersContext } from "@/contexts/orders.context";
import { toast } from "sonner";

export const AddProductToPalletBtn = ({ row }: any) => {
  const { setProductsAddedToCreatePallet } = useOrdersContext();

  return (
    <button
      className="btn btn-primary"
      onClick={() =>
        setProductsAddedToCreatePallet((prev) => {
          const product = prev.find(
            (p) =>
              p.purchase_order_product_id ===
              row.original.purchase_order_product_id
          );

          if (!product) {
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
        })
      }
    >
      <AddButton />
    </button>
  );
};
