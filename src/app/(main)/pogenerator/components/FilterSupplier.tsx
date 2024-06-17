'use client';

import { useSupplierContext } from "@/contexts/suppliers.context";
import { useTrackedProductContext } from "@/contexts/trackedProducts.context";
import { SupplierType } from "@/types/supplier.types";
import { useEffect, useState } from "react";

export const FilterSupplier = () => {

  const { setSupplierId } = useTrackedProductContext();
  const { suppliers } = useSupplierContext();

  const handleSupplierChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const supplier_id = event.target.value;
    console.log(supplier_id);
    setSupplierId(supplier_id);
  };

  return (
    <select onChange={handleSupplierChange} className="w-[150px] bg-dark border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:text-white">
      <option value="">All Suppliers</option>
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