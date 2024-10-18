import { Input } from "@/components/ui/input";
import { useOrdersContext } from "@/contexts/orders.context";
import { useState } from "react";

type QuantityReceivedCellProps = {
  row: any;
};

export default function QuantityReceivedCell({
  row,
}: QuantityReceivedCellProps) {
  const { addQuantityReceived } = useOrdersContext(); // Usamos el contexto para actualizar el pedido
  const [quantityReceived, setQuantityReceived] = useState(
    row.original.quantity_received
  );

  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | null>(
    null
  );

  const handleQuantityChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newQuantity = e.target.value;
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
      }, 500)
    );
  };

  return (
    <Input
      type="number"
      className="border p-1 w-20 dark:bg-dark-2 dark:text-light-2 border-dark-3 dark:border-light-3 rounded-md text-xs text-center"
      value={quantityReceived}
      onChange={handleQuantityChange}
      min={0} // Si quieres restringir a números positivos
    />
  );
}
