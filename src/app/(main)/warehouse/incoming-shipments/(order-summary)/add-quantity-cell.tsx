import { Input } from "@/components/ui/input";
import { useOrdersContext } from "@/contexts/orders.context";

type AddQuantityCellProps = {
  purchaseOrderProductId: number;
};

export default function AddQuantityCell({
  purchaseOrderProductId,
}: AddQuantityCellProps) {
  const {
    setProductsAvaliableToCreatePallet,
    setProductsAddedToCreatePallet,
    productsAvaliableToCreatePallet,
    productsAddedToCreatePallet,
  } = useOrdersContext();

  const handleQuantityChange = (event: any) => {
    const quantity = parseInt(event.target.value);

    // Actualiza la cantidad en `productsAddedToCreatePallet`
    setProductsAddedToCreatePallet((prev) => {
      // Si el producto ya existe, solo actualizamos su cantidad
      const productExists = prev.some(
        (product) =>
          product.purchase_order_product_id === purchaseOrderProductId
      );

      if (productExists) {
        return prev.map((product) => {
          if (product.purchase_order_product_id === purchaseOrderProductId) {
            return { ...product, quantity };
          }
          return product;
        });
      }

      // Si el producto no existe, lo añadimos con la cantidad especificada
      return [
        ...prev,
        {
          purchase_order_product_id: purchaseOrderProductId,
          quantity,
        },
      ];
    });

    // Actualiza `quantity_avaliable` en `productsAvaliableToCreatePallet`
    setProductsAvaliableToCreatePallet((prev) => {
      return prev.map((product) => {
        if (product.purchase_order_product_id === purchaseOrderProductId) {
          return {
            ...product,
            quantity_avaliable: product.quantity_received - quantity,
          };
        }
        return product;
      });
    });
  };

  return (
    <Input
      className="w-24 text-xs"
      type="number"
      min={0}
      onChange={handleQuantityChange}
    />
  );
}
