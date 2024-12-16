import { Input } from "@/components/ui/input";
import { useOrdersContext } from "@/contexts/orders.context";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

type QuantityReceivedCellProps = {
  row: any;
  setLocalData: any;
};

export default function QuantityReceivedCell({
  row,
  setLocalData,
}: QuantityReceivedCellProps) {
  const {
    addQuantityReceived,
    setProductsAvaliableToCreatePallet,
    productsAvaliableToCreatePallet,
  } = useOrdersContext(); // Usamos el contexto para actualizar el pedido
  const [quantityReceived, setQuantityReceived] = useState(
    row.original.quantity_received
  );

  const [palletProductQuantity, setPalletProductQuantity] = useState(0);

  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | null>(
    null
  );

  console.log(row.original.purchase_order_product_id);

  const getPalletProductQuantity = useCallback(async () => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/pallets/${row.original.purchase_order_product_id}/palletproduct`;
    console.log(url);
    const response = await fetch(url);
    const data = await response.json();
    return data;
  }, [row.original.purchase_order_product_id]);

  useEffect(() => {
    getPalletProductQuantity().then((data) => {
      setPalletProductQuantity(parseInt(data.totalQuantity));
    });
  }, [getPalletProductQuantity]);

  console.log(palletProductQuantity);

  const handleQuantityChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newQuantity = e.target.value;

    if (newQuantity > row.original.quantity_purchased) {
      return toast.error(
        "Quantity received cannot be greater than quantity purchased"
      );
    }

    setQuantityReceived(newQuantity);

    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }

    setSearchTimeout(
      setTimeout(async () => {
        // Llamada para actualizar el valor en la base de datos o backend
        await addQuantityReceived(
          row.original.purchase_order_product_id,
          parseInt(newQuantity)
        );

        setLocalData((prev: any) => {
          return prev.map((product: any) => {
            if (
              product.purchase_order_product_id ===
              row.original.purchase_order_product_id
            ) {
              return {
                ...product,
                quantity_received: parseInt(newQuantity),
                quantity_missing:
                  product.quantity_purchased - parseInt(newQuantity),
              };
            }
            return product;
          });
        });

        setProductsAvaliableToCreatePallet((prev: any) => {
          return prev.map((product: any) => {
            if (
              product.purchase_order_product_id ===
              row.original.purchase_order_product_id
            ) {
              return {
                ...product,
                quantity_available:
                  parseInt(newQuantity) - palletProductQuantity,
              };
            }
            return product;
          });
        });

        setSearchTimeout(null);
      }, 500)
    );
  };

  console.log(row.original.quantity_purchased);

  return (
    <Input
      type="number"
      className="border p-1 w-20 dark:bg-dark-2 dark:text-light-2 border-dark-3 dark:border-light-3 rounded-md text-xs text-center"
      value={quantityReceived}
      onChange={handleQuantityChange}
      min={0} // Si quieres restringir a números positivos
      max={row.original.quantity_purchased}
    />
  );
}
