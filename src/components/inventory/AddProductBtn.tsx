"use client";
import { useProductContext } from "@/contexts/products.context";

const AddProductBtn = () => {
  const { addingProduct, setAddingProduct } = useProductContext();

  return (
    <button
      onClick={() => setAddingProduct(!addingProduct)}
      className="w-[100px] bg-[#438EF3] text-white px-4 py-2 rounded text-xs"
    >
      {addingProduct ? (
        <p className="flex items-center justify-center gap-2">Save</p>
      ) : (
        <p className="flex items-center justify-center gap-2">Add product</p>
      )}
    </button>
  );
};

export default AddProductBtn;
