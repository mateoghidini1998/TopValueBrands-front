"use client";
import { useProductContext } from "@/contexts/products.context";

export const OrderByStock = () => {
  const { handleSetOrderBy } = useProductContext();

  return (
    <div className="flex flex-col items-center">
      <button
        onClick={() => handleSetOrderBy("FBA_available_inventory", "desc")}
      >
        👆🏻
      </button>
      <button
        onClick={() => handleSetOrderBy("FBA_available_inventory", "asc")}
      >
        👇🏻
      </button>
    </div>
  );
};
