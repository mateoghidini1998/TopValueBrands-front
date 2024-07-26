"use client";

import { useSupplierContext } from "@/contexts/suppliers.context";
import { useTrackedProductContext } from "@/contexts/trackedProducts.context";
import { SupplierType } from "@/types/supplier.types";
import { useEffect, useState } from "react";

export const FilterSupplier = () => {
  const { setSupplierId, supplierId, currentPage, setCurrentPage } =
    useTrackedProductContext();
  const { suppliers } = useSupplierContext();
  const [showPlaceholder, setShowPlaceholder] = useState(true);

  const handleSupplierChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSupplierId(event.target.value);
    setCurrentPage(1);
    const supplier_id = supplierId;
  };

  const hidePlaceholder = () => setShowPlaceholder(false);

  return (
    <div className="flex justify-center relative">
      {showPlaceholder && !supplierId && (
        <div className="transition-colors duration-[0.6s] ease-in-out p-2 h-full w-full flex items-center text-black bg-[#F8FAFC] border-[#EFF1F3] dark:border-[#393E4F] border-solid border-[1px] rounded dark:bg-dark dark:text-light absolute top-0 pointer-events-none">
          <span className="text-xs font-medium text-[#55597D]">
            Filter by supplier
          </span>
        </div>
      )}
      <select
        onFocus={hidePlaceholder}
        onBlur={() => setShowPlaceholder(true)}
        onChange={handleSupplierChange}
        value={supplierId}
        className="py-2 transition-colors duration-[0.6s] ease-in-out p-2.5 flex w-[235px] justify-between items-center rounded bg-white dark:bg-dark-2 border border-solid border-[#393E4F] text-[#55597D] text-xs font-medium"
        aria-label="Filter products by supplier"
      >
        <option value="">All Suppliers</option>
        {suppliers.map((supplier: SupplierType) => (
          <option key={supplier.id} value={supplier.id}>
            {supplier.supplier_name}
          </option>
        ))}
      </select>
    </div>
  );
};
