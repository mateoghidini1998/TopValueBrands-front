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
  createSupplier: (supplier: String) => any;
  editSupplier: (supplier: SupplierType) => any;
  getSuppliers: () => void;
  deleteSupplier: (id: number) => any;
};

export const SupplierContext = createContext<SupplierState>({
  suppliers: [],
  getSuppliers: () => {},
  createSupplier: (): any => {},
  editSupplier: (): any => {},
  deleteSupplier: (): any => {},
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
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const editSupplier = async (supplier: SupplierType) => {
    try {
      const response = await SuppliersService.updateSupplier(supplier);
      // UPDATE THE SUPPLIERS STATE HERE WITH THE NEW SUPPLIER UPDATED
      // DELETE THE OLD SUPPLIER FROM THE SUPPLIERS STATE
      const newSuppliers = suppliers.filter(
        (supplier: SupplierType) => supplier.id !== response.data.id
      );
      // ADD THE NEW SUPPLIER TO THE SUPPLIERS STATE

      setSuppliers([...newSuppliers, response.data]);

      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const deleteSupplier = async (id: number) => {
    try {
      const response = await SuppliersService.deleteSupplier(id);
      setSuppliers(
        suppliers.filter((supplier: SupplierType) => supplier.id !== id)
      );
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return (
    <SupplierContext.Provider
      value={{
        suppliers,
        getSuppliers,
        createSupplier,
        editSupplier,
        deleteSupplier,
      }}
    >
      {children}
    </SupplierContext.Provider>
  );
};
export const useSupplierContext = () => useContext(SupplierContext);
