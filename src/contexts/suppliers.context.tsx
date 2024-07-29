"use client";
import { SuppliersService } from "@/services/suppliers/suppliers.service";
import { SupplierType } from "@/types/supplier.types";
import {
  FC,
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

export type SupplierState = {
  suppliers: SupplierType[];
  createSupplier: (supplier: String) => void;
  getSuppliers: () => void;
};

export const SupplierContext = createContext<SupplierState>({
  suppliers: [],
  getSuppliers: () => {},
  createSupplier: (): any => {},
});

export const SupplierProvider: FC<PropsWithChildren> = ({
  children,
}: PropsWithChildren) => {
  const [suppliers, setSuppliers] = useState<any>([]);

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

  const createSupplier = async (supplier: String) => {
    try {
      const response = await SuppliersService.addSupplier(supplier);
      setSuppliers([...suppliers, response.data]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SupplierContext.Provider
      value={{ suppliers, getSuppliers, createSupplier }}
    >
      {children}
    </SupplierContext.Provider>
  );
};
export const useSupplierContext = () => useContext(SupplierContext);
