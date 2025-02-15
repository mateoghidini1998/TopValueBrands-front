import { Input } from "@/components/ui/input";
import { useState, useCallback } from "react";
import debounce from "lodash.debounce";

const InputProductCost = ({
  row,
  setEditingOrder,
  setTrackedProductsData,
}: any) => {
  const [value, setValue] = useState(row.original?.product_cost);

  // Debounced function to update the state
  const debouncedUpdate = useCallback(
    debounce((newValue: number) => {
      // Actualiza poProductUpdates

      setEditingOrder((prev: any) => {
        if (!prev) return prev;
        const index = prev.findIndex(
          (product: any) =>
            product.purchaseOrderProductId ===
            row.original.purchase_order_product_id
        );
        if (index !== -1) {
          const updatedProducts = [...prev];
          updatedProducts[index] = {
            ...updatedProducts[index],
            product_cost: newValue,
            profit:
              row.original.lowest_fba_price - row.original.fees - newValue,
          };
          // console.log(updatedProducts);
          return updatedProducts;
        }

        return prev;
      });

      // Actualiza trackedProductsData
      setTrackedProductsData((prev: any) => {
        if (!prev) return prev;
        const index = prev.findIndex(
          (product: any) =>
            product.purchase_order_product_id ===
            row.original.purchase_order_product_id
        );

        if (index !== -1) {
          const updatedProducts = [...prev];
          updatedProducts[index] = {
            ...updatedProducts[index],
            product_cost: newValue,
            purchase_order_product_profit:
              row.original.lowest_fba_price - row.original.fees - newValue,
            roi:
              newValue > 0
                ? ((row.original.lowest_fba_price -
                    row.original.fees -
                    newValue) /
                    newValue) *
                  100
                : 0,
          };
          return updatedProducts;
        }

        return prev;
      });
    }, 1500), // 1500 ms debounce delay
    [
      setEditingOrder,
      setTrackedProductsData,
      row.original.purchase_order_product_id,
    ]
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(e.target.value);
    setValue(newValue);

    // Update row values immediately for instant feedback
    row.original.product_cost = newValue;
    row.original.total_amount = newValue * row.original.quantity_purchased;

    // Call debounced update function
    debouncedUpdate(newValue);
  };

  return (
    <Input
      className="w-20 h-8 text-center text-xs"
      type="number"
      step="0.01"
      value={value}
      onChange={handleChange}
    />
  );
};

export default InputProductCost;
