'use client';
import { SuppliersService } from "@/services/suppliers/suppliers.service";
import { SupplierType } from "@/types/supplier.types";
import { FC, PropsWithChildren, createContext, useContext, useEffect, useState } from "react";

export type SupplierState = {
  suppliers: SupplierType[]
  getSuppliers: () => void
};

export const ProductContext = createContext<SupplierState>({
  suppliers: [],
  getSuppliers: () => {},
});

export const SupplierProvider: FC<PropsWithChildren> = ({
  children,
}: PropsWithChildren) => {

  const [suppliers, setSuppliers] = useState([]);

  useEffect(() => {
    getSuppliers();
  }, []);

  const getSuppliers = async () => {
    try {
      const response = await SuppliersService.getSuppliers();
      setSuppliers(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ProductContext.Provider value={{ suppliers, getSuppliers }}>{children}</ProductContext.Provider>
  );
};
export const useSupplierContext = () => useContext(ProductContext);
