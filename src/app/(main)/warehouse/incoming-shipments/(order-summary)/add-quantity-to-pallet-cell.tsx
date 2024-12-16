"use client";

import { Input } from "@/components/ui/input";
import { useOrdersContext } from "@/contexts/orders.context";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type AddQuantityCellProps = {
  purchaseOrderProductId: number;
};

export default function AddQuantityToPalletCell({
  purchaseOrderProductId,
}: AddQuantityCellProps) {
  const {
    setProductsAvaliableToCreatePallet,
    setProductsAddedToCreatePallet,
    productsAvaliableToCreatePallet,
    productsAddedToCreatePallet,
  } = useOrdersContext();

  const product = productsAddedToCreatePallet.find(
    (product) => product.purchase_order_product_id === purchaseOrderProductId
  );

  const availableProduct = productsAvaliableToCreatePallet.find(
    (product) => product.purchase_order_product_id === purchaseOrderProductId
  );

  const [quantity, setQuantity] = useState(product?.quantity || 0);
  const [initialAvailableQuantity, setInitialAvailableQuantity] = useState(
    availableProduct?.quantity_available || 0
  );

  useEffect(() => {
    setQuantity(product?.quantity || 0);
    setInitialAvailableQuantity(availableProduct?.quantity_available || 0);
  }, [product, availableProduct]);

  const handleQuantityChange = (event: any) => {
    const newQuantity = parseInt(event.target.value);

    if (newQuantity > initialAvailableQuantity) {
      return toast.error("Quantity cannot be greater than quantity available");
    }

    if (isNaN(newQuantity) || newQuantity < 0) return;

    const quantityDifference = newQuantity - quantity;

    // Actualiza la cantidad en `productsAddedToCreatePallet`
    setProductsAddedToCreatePallet((prev) => {
      const productExists = prev.some(
        (product) =>
          product.purchase_order_product_id === purchaseOrderProductId
      );

      if (productExists) {
        return prev.map((product) => {
          if (product.purchase_order_product_id === purchaseOrderProductId) {
            return { ...product, quantity: newQuantity };
          }
          return product;
        });
      }

      return [...prev];
    });

    // Actualiza `quantity_available` en `productsAvaliableToCreatePallet`
    setProductsAvaliableToCreatePallet((prev) => {
      return prev.map((product) => {
        if (product.purchase_order_product_id === purchaseOrderProductId) {
          return {
            ...product,
            quantity_available: product.quantity_available - quantityDifference,
          };
        }
        return product;
      });
    });

    setQuantity(newQuantity);
  };

  return (
    <Input
      className="w-24 text-xs"
      type="number"
      min={0}
      onChange={handleQuantityChange}
      value={quantity}
    />
  );
}
