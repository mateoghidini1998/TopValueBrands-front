import { Input } from "@/components/ui/input";
import { useOrdersContext } from "@/contexts/orders.context";
import { useState } from "react";

type QuantityReceivedCellProps = {
  row: any;
};

export default function QuantityReceivedCell({
  row,
}: QuantityReceivedCellProps) {
  console.log(row.original);

  const { addQuantityReceived } = useOrdersContext(); // Usamos el contexto para actualizar el pedido
  const [quantityReceived, setQuantityReceived] = useState(
    row.original.quantity_received
  );

  const handleQuantityChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newQuantity = e.target.value;
    setQuantityReceived(newQuantity);

    // Llamada para actualizar el valor en la base de datos o backend
    await addQuantityReceived(
      row.original.purchase_order_product_id,
      parseInt(newQuantity)
    );
  };

  return (
    <Input
      type="number"
      className="border p-1 w-20"
      value={quantityReceived}
      onChange={handleQuantityChange}
      min={0} // Si quieres restringir a números positivos
    />
  );
}
