'use client';

import { useSupplierContext } from "@/contexts/suppliers.context";
import { useTrackedProductContext } from "@/contexts/trackedProducts.context";
import { SupplierType } from "@/types/supplier.types";
import { useEffect, useState } from "react";

export const FilterSupplier = () => {

  const { setSupplierId, supplierId } = useTrackedProductContext();
  const { suppliers } = useSupplierContext();

  const handleSupplierChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    
    setSupplierId(event.target.value);
    const supplier_id = supplierId;
  };

  return (
    <select onChange={handleSupplierChange} value={supplierId} className="w-[150px] bg-dark border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:text-white">
      <option value={''}>All Suppliers</option>
      {suppliers.map((supplier: SupplierType) => (
        <option
          key={supplier.id}
          value={supplier.id}
        >
          {supplier.supplier_name}
        </option>
      ))}
    </select>
  )
}