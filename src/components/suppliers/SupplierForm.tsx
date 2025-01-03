"use client";

import { EditSupplierType } from "@/types/supplier.types";
import { useEffect, useState } from "react";

export type SupplierFormProps = {
  setIsCreatingSupplier: (value: boolean) => void;
  createSupplier: (supplier_name: string) => any;
  editSupplier?: (supplier: EditSupplierType) => any;
  editingSupplier?: {
    id: number;
    supplier_name: string;
  };
};

export default function SupplierForm({
  setIsCreatingSupplier,
  createSupplier,
  editingSupplier = {
    id: 0,
    supplier_name: "",
  },
  editSupplier = () => {},
}: SupplierFormProps) {
  const [formData, setFormData] = useState({
    id: 0,
    supplier_name: editingSupplier.supplier_name || "",
  });

  const IS_EDITING = editingSupplier.id !== 0;

  useEffect(() => {
    if (IS_EDITING) {
      setFormData({
        id: editingSupplier.id,
        supplier_name: editingSupplier.supplier_name,
      });
    }
  }, [editingSupplier]);

  // console.log("IS_EDITING", IS_EDITING);
  // console.log({ formData });
  // console.log(editingSupplier);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleEditSupplier = (supplier: EditSupplierType) => {
    return editSupplier(supplier);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (IS_EDITING) {
      handleEditSupplier({
        id: formData.id,
        supplier_name: formData.supplier_name,
      })
        .then((response: any) => {
          if (response) {
            // console.log(response);
            alert("Supplier updated successfully");
            setFormData({ id: 0, supplier_name: "" });
            setIsCreatingSupplier(false);
          }
        })
        .catch((error: any) => {
          console.error(error);
          alert("Error creating supplier");
        });
    } else {
      createSupplier(formData.supplier_name)
        .then((response: any) => {
          if (response) {
            // console.log(response);
            alert("Supplier created successfully");
            setFormData({ id: 0, supplier_name: "" });
            setIsCreatingSupplier(false);
          }
        })
        .catch((error: any) => {
          console.error(error);
          alert("Error creating supplier");
        });
    }
  };

  return (
    <dialog
      open
      className="h-[95%] w-[450px] dark:shadow-[0_0_50px_0_rgba(0,0,0,0.2)] rounded-2xl py-12 px-14 dark:bg-dark fixed z-[2000] inset-0 overflow-y-auto bg-[#FFFFFF] shadow-[0_0_50px_0_rgba(0,0,0,0.2)] no-scrollbar"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <h1 className="text-lg text-black dark:text-white mb-10">
        {IS_EDITING ? "Edit Supplier" : "Create Supplier"}
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label
            htmlFor="supplier_name"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Supplier Name
          </label>
          <input
            type="text"
            id="supplier_name"
            name="supplier_name"
            value={formData.supplier_name}
            onChange={handleInputChange}
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          />
        </div>

        <div className="w-full flex flex-col items-center justify-between mt-10">
          <button
            type="submit"
            className="w-full p-2 rounded-md bg-[#438EF3] text-[14px] text-white"
          >
            Submit
          </button>

          <button
            type="button"
            className="text-[#61656E] dark:text-[#f8fafc] dark:bg-[#393E4F] bg-[#F8FAFC] border-[#eff1f3] flex justify-center w-full items-center gap-2 px-4 py-2 text-sm dark:hover:bg-dark-3 border-2 dark:border-[#393E4F] rounded-md mt-6"
            onClick={() => {
              setIsCreatingSupplier(false);
              setFormData({ id: 0, supplier_name: "" });
            }}
          >
            Discard
          </button>
        </div>
      </form>
    </dialog>
  );
}
