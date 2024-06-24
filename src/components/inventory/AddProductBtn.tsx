"use client";
import { useProductContext } from "@/contexts/products.context";
import { usePathname } from "next/navigation";

const AddProductBtn = () => {
  const { addingProduct, setAddingProduct } = useProductContext();
  const isHome = usePathname() === "/";

  return (
    isHome && (
      <button
        onClick={() => setAddingProduct(!addingProduct)}
        className={`w-[100px] text-white px-4 py-2 rounded text-xs ${!addingProduct ? ' bg-[#438EF3]' : 'bg-[#972820]'}`}
      >
        {
          addingProduct ? "Cancel" : "Add Product"
       }
      </button>
    )
  );
};

export default AddProductBtn;
