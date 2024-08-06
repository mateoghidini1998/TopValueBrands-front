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
    createSupplier(formData.supplier_name)
      .then((response: any) => {
        if (response) {
          // console.log(response);
          alert("Supplier created successfully");
          setFormData({ supplier_name: "" });
          setIsCreatingSupplier(false);
        }
      })
      .catch((error: any) => {
        console.log(error);
        alert("Error creating supplier");
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
              setFormData({ supplier_name: "" });
            }}
          >
            Discard
          </button>
        </div>
      </form>
    </dialog>
  );
}
