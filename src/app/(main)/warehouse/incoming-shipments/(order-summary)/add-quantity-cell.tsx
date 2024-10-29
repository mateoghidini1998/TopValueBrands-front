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

    setProductsAddedToCreatePallet((prev) => {
      return prev.map((product) => {
        if (product.purchase_order_product_id === purchaseOrderProductId) {
          return { ...product, quantity: quantity };
        }
        return product;
      });
    });

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

  console.log({ productsAddedToCreatePallet });
  console.log({ productsAvaliableToCreatePallet });

  return (
    <Input
      className="w-24 text-xs"
      type="number"
      onChange={handleQuantityChange}
    />
  );
}
