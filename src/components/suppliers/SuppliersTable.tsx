"use client";
import { useSupplierContext } from "@/contexts/suppliers.context";
import { useState } from "react";
import { IoMdAdd } from "react-icons/io";
import SupplierForm from "./SupplierForm";

export type SupplierType = {
  id: number;
  supplier_name: string;
  createdAt: string;
  updatedAt: string;
};

export default function SuppliersTable() {
  const { suppliers, getSuppliers, createSupplier }: any = useSupplierContext();

  const SUPPLIERS_COLUMNS = [
    "ID",
    "Supplier Name",
    "Created At",
    "Updated At",
    // "Actions",
  ];

  const [isCreatingSupplier, setIsCreatingSupplier] = useState(false);

  const handleCreateSupplier = () => {
    setIsCreatingSupplier(true);
  };

  return !isCreatingSupplier ? (
    <table className="w-full mb-5 rounded-[20px] border-[#EFF1F3] dark:border-[#393E4F] border-[1px] border-solid border-separate relative">
      {/* table head */}
      <thead className="">
        <tr className="py-6 stroke-1 stroke-[#393E4F] flex items-center h-[60px] w-full text-black bg-[#F8FAFC] dark:text-white dark:bg-[#262935] border-t rounded-t-[20px] border-transparent">
          <>
            {SUPPLIERS_COLUMNS.map((column, index) => {
              return column === "Actions" ? (
                <th
                  key={index}
                  className="w-[15%] text-xs font-medium text-right"
                >
                  {column}
                </th>
              ) : (
                <th
                  key={index}
                  className="w-[15%] text-xs font-medium text-center"
                >
                  {column}
                </th>
              );
            })}
            <button
              className="w-[15%] text-xs font-medium absolute right-0 flex items-end justify-center gap-2"
              onClick={handleCreateSupplier}
            >
              <IoMdAdd className="text-[#438EF3] font-bold w-4 h-4" /> Add
              Supplier
            </button>
          </>
        </tr>
      </thead>
      {/* table body */}
      <tbody className="w-full text-left mt-10">
        {suppliers.map((supplier: SupplierType, index: number) => (
          <tr
            key={index}
            className={`dark:bg-dark relative py-6 text-light stroke-1 dark:stroke-[#393E4F] flex items-center h-[65px] w-full dark:text-white bg-transparent border-t dark:border-t-[#393E4F] ${
              index === suppliers.length - 1 ? "last-row" : ""
            } ${index === 0 && "border-t-0"}`}
          >
            <td className="w-[15%] text-xs font-medium text-center">{`# ${supplier.id}`}</td>
            <td className="w-[15%] text-xs font-medium text-center">
              {supplier.supplier_name}
            </td>
            <td className="w-[15%] text-xs font-medium text-center">
              {`${new Date(supplier.createdAt)
                .toLocaleString("en-US", {
                  month: "2-digit",
                  day: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false,
                })
                .replace(",", "")}`}
            </td>
            <td className="w-[15%] text-xs font-medium text-center">
              {`${new Date(supplier.createdAt)
                .toLocaleString("en-US", {
                  month: "2-digit",
                  day: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false,
                })
                .replace(",", "")}`}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  ) : (
    <SupplierForm
      createSupplier={createSupplier}
      setIsCreatingSupplier={setIsCreatingSupplier}
    />
  );
}
