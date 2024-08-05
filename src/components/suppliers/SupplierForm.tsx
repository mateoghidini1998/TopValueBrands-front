"use client";

import { useState } from "react";

export type SupplierFormProps = {
  setIsCreatingSupplier: (value: boolean) => void;
  createSupplier: (supplier_name: string) => any;
};

export default function SupplierForm({
  setIsCreatingSupplier,
  createSupplier,
}: SupplierFormProps) {
  const [formData, setFormData] = useState({ supplier_name: "" });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    createSupplier(formData.supplier_name).then((response: any) => {
      if (response) {
        setFormData({ supplier_name: "" });
        alert("Supplier created successfully");
        setIsCreatingSupplier(false);
      }
    });
  };

  return (
    <dialog
      open
      className="h-[95%] w-[450px] dark:shadow-[0_0_50px_0_rgba(0,0,0,0.2)] rounded-2xl py-12 px-14 dark:bg-dark fixed z-[2000] inset-0 overflow-y-auto bg-[#FFFFFF] shadow-[0_0_50px_0_rgba(0,0,0,0.2)] no-scrollbar"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
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

        <div className="w-full flex items-center justify-between mt-10">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Submit
          </button>

          <button
            type="button"
            onClick={() => {
              setIsCreatingSupplier(false);
              setFormData({ supplier_name: "" });
            }}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Cancel
          </button>
        </div>
      </form>
    </dialog>
  );
}
