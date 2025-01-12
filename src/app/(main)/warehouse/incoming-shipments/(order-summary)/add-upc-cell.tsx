"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/useDebounce";
import { toast } from "sonner";

type AddUPCCellProps = {
  row: any;
};

export default function AddUPCCell({ row }: AddUPCCellProps) {
  // Inicializar el estado con el UPC existente si existe
  const [upc, setUpc] = useState<string>(row.original.upc || "");
  const [isUpdating, setIsUpdating] = useState(false);
  const debouncedUpc = useDebounce(upc, 2000); // 500ms delay

  console.log(row.original);

  useEffect(() => {
    // Solo actualizar si el valor ha cambiado y no está vacío
    if (debouncedUpc !== row.original.upc && debouncedUpc !== "") {
      updateUPC(debouncedUpc);
    }
  }, [debouncedUpc]);

  const updateUPC = async (value: string) => {
    setIsUpdating(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/purchaseorders/${row.original.product_id}/addUPC`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            upc: value,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update UPC");
      }

      const data = await response.json();
      toast.success("The UPC has been successfully updated.");
    } catch (error) {
      console.error("Error updating UPC:", error);
      toast.error("Failed to update UPC. Please try again.");
      // Revertir al valor anterior en caso de error
      setUpc(row.original.upc || "");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleUPCChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpc(e.target.value);
  };

  return (
    <Input
      defaultValue={row.original.upc || ""}
      type="text"
      className={`border p-1 min-w-20 w-fit dark:bg-dark-2 dark:text-light-2 border-dark-3 
        dark:border-light-3 rounded-md text-xs text-center
        ${isUpdating ? "opacity-50" : ""}`}
      value={upc}
      onChange={handleUPCChange}
      disabled={isUpdating}
      placeholder="Enter UPC"
    />
  );
}
