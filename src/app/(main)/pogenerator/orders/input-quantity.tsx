import { Input } from "@/components/ui/input";
import { useState, useCallback } from "react";
import debounce from "lodash.debounce";

const InputQuantity = ({
  row,
  setEditingOrder,
  setTrackedProductsData,
}: any) => {
  const [value, setValue] = useState(row.original?.quantity_purchased);

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
            quantity_purchased: newValue,
          };
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
            quantity_purchased: newValue,
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
    row.original.quantity_purchased = newValue;
    row.original.total_amount = newValue * row.original.unit_price;

    // Call debounced update function
    debouncedUpdate(newValue);
  };

  return (
    <Input
      className="w-24 text-center text-xs"
      type="number"
      step="0.01"
      value={value}
      onChange={handleChange}
    />
  );
};

export default InputQuantity;
