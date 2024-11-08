"use client";
import { useOrdersContext } from "@/contexts/orders.context";
import { useState } from "react";

type NotesCellProps = {
  row: any;
};

export default function NotesCell({ row }: NotesCellProps) {
  const { addNotesToPOProduct } = useOrdersContext(); // Usamos el contexto para actualizar el pedido
  const [poProductNotes, setPoProductNotes] = useState(
    row.purchase_order_product_notes || ""
  );
  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | null>(
    null
  );
  const handleNotesChange = async (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }
    const notes = e.target.value;
    setPoProductNotes(notes);

    setSearchTimeout(
      setTimeout(async () => {
        // Llamada para actualizar el valor en la base de datos o backend
        await addNotesToPOProduct(
          row.purchase_order_product_id,
          poProductNotes
        );
      }, 500)
    );
  };

  return (
    <textarea
      name=""
      id=""
      className="dark:bg-dark-2 dark:text-light-2 w-full h-12 border border-dark-3 dark:border-light-3 rounded-md p-1"
      defaultValue={row.purchase_order_product_notes}
      onChange={handleNotesChange}
    ></textarea>
  );
}
