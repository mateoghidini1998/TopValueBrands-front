"use client";
import { useProductContext } from "@/contexts/products.context";
import useThemeContext from "@/contexts/theme.context";
import React, { ChangeEvent, useEffect, useState } from "react";
import CancelButton from "../svgs/CancelButton";
import SaveButton from "../svgs/SaveButton";
import { SupplierType } from "@/types/supplier.types";
import { useSupplierContext } from "@/contexts/suppliers.context";

export interface NewProductType {
  product_name?: string;
  ASIN: string;
  seller_sku?: string;
  product_cost: number;
  supplier_id: number;
  supplier_item_number: string;
  pack_type?: string;
}

const NewTableRow = () => {
  const { suppliers } = useSupplierContext();
  const isDarkmode = localStorage.getItem("theme") === "dark";
  const [theme, setTheme] = useState(isDarkmode ? "dark" : "light");

  useEffect(() => {
    if (theme === "dark") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }, [theme]);

  const { sidebarOpen } = useThemeContext();

  const exampleProduct = {
    product_name: "",
    ASIN: "",
    seller_sku: "",
    product_cost: 0,
    supplier_id: 0,
    supplier_item_number: "",
    pack_type: "",
  };

  const { setAddingProduct, createProduct } = useProductContext();

  const [formData, setFormData] = useState<NewProductType>({
    ASIN: exampleProduct.ASIN,
    product_cost: exampleProduct.product_cost,
    supplier_id: exampleProduct.supplier_id,
    supplier_item_number: exampleProduct.supplier_item_number,
  });

  const [filterText, setFilterText] = useState<string>("");
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const [selectedSupplier, setSelectedSupplier] = useState<number | null>(
    formData.supplier_id || null
  );

  const filteredSuppliers = suppliers.filter((supplier) =>
    supplier.supplier_name.toLowerCase().includes(filterText.toLowerCase())
  );

  const handleFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFilterText(e.target.value);
    setShowOptions(true);
  };

  const onChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  const handleSelectSupplier = (supplier: SupplierType) => {
    setSelectedSupplier(supplier.id);
    setFilterText(supplier.supplier_name);
    setShowOptions(false);
    onChangeSelect({
      target: { name: "supplier_id", value: supplier.id },
    } as unknown as ChangeEvent<HTMLSelectElement>);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleChangeTextArea = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCreateProduct = (newProduct: NewProductType) => {
    const requiredFields = [
      "supplier_id",
      "supplier_item_number",
      "ASIN",
      "product_cost",
    ];
    console.log(Object.keys(newProduct));

    for (const field of requiredFields) {
      if (!newProduct[field as keyof NewProductType]) {
        alert(`Product ${field} is required`);
        return;
      }
    }
    console.log(newProduct);
    createProduct(newProduct);
    setAddingProduct(false);
    setFormData(exampleProduct);
  };

  return (
    <tbody
      className={` ${sidebarOpen ? "inventory_new_product" : "inventory_new_product_tr"}`}
    >
      <tr
        className={`${
          true ? "mt-[60px]" : ""
        } m-0 w-full py-1 stroke-1 stroke-dark-3 flex items-center min-h-[80px] h-fit ${
          sidebarOpen ? "w-full" : "w-full"
        }  text-light bg-white dark:bg-dark  border-b dark:border-b-dark-3 dark:text-white border-b-[#EFF1F3]`}
      >
        {/* <ProductNameTableData product={product} width={"25%"} /> */}
        <td className="w-[17%] text-xs font-medium text-center">
          <textarea
            name="product_name"
            // type="text"
            className="w-[90%] mx-auto h-[30px] text-xs bg-white dark:bg-dark border-[1px] rounded-md px-4 dark:text-white border-light border-solid flex items-center text-left pt-[.35rem] disabled:border-red-400"
            placeholder="Automated product name"
            disabled
            onChange={handleChangeTextArea}
            // defaultValue={formData.product_name}
          />
        </td>
        <td className="w-[8%] text-xs font-medium text-center">
          <input
            name="ASIN"
            type="text"
            className="w-[90%] mx-auto h-[30px] text-xs bg-white dark:bg-dark border-[1px] rounded-md px-4 dark:text-white border-light border-solid  "
            placeholder="ASIN"
            onChange={handleChange}
            // defaultValue={formData.ASIN}
          />
        </td>
        <td className="w-[8%] text-xs font-medium text-center">
          <input
            type="text"
            className="w-[90%] mx-auto h-[30px] text-xs bg-white dark:bg-dark border-[1px] rounded-md px-4 dark:text-white border-light border-solid  "
            placeholder="seller sku"
            name="seller_sku"
            onChange={handleChange}
          />
        </td>
        <td className="w-[5%] text-xs font-medium text-center">
          <input
            type="text"
            className="w-[90%] mx-auto h-[30px] text-xs bg-white dark:bg-dark border-[1px] rounded-md px-4 dark:text-white border-light border-solid  "
            placeholder="0"
            name="product_cost"
            onChange={handleChange}
            // defaultValue={formData.ASIN}
          />
        </td>
        <td className="w-[10%] text-xs font-medium text-center">
          <div className="relative">
            <input
              type="text"
              value={filterText}
              onChange={handleFilterChange}
              onClick={() => setShowOptions(true)}
              placeholder="Filter suppliers"
              className="w-[90%] mx-auto h-[30px] text-xs bg-white dark:bg-dark border-[1px] rounded-md px-4 dark:text-white border-light border-solid"
            />
            {showOptions && (
              <ul className="absolute z-10 w-full bg-[#F8FAFC] dark:bg-[#262935] border-[1px] border-solid dark:border-dark-3 border-[#EFF1F3] rounded-lg mt-1 max-h-40 overflow-y-auto no-scrollbar">
                {filteredSuppliers.map((supplier: SupplierType) => (
                  <li
                    key={supplier.id}
                    onClick={() => handleSelectSupplier(supplier)}
                    className="p-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700"
                  >
                    {supplier.supplier_name}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </td>
        <td className="w-[10%] text-xs font-medium text-center">
          <input
            type="text"
            className="w-[90%] mx-auto h-[30px] text-xs dark:bg-dark border-[1px] rounded-md px-4 dark:text-white border-light border-solid  "
            placeholder="0"
            onChange={handleChange}
            name="supplier_item_number"
            // defaultValue={formData.ASIN}
          />
        </td>
        <td className="w-[10%] text-xs font-medium text-center">
          {/* <input
            type="text"
            className="w-[90%] mx-auto h-[30px] text-xs bg-dark border-[1px] rounded-md px-4 dark:text-white border-light border-solid  "
            placeholder="pack type"
            name="pack_type"
            onChange={handleChange}
            // defaultValue={formData.ASIN}
          /> */}
          {"N/A"}
        </td>
        <td className="w-[5%] text-xs font-medium text-center">
          {/* <input
            type="text"
            className="w-[90%] mx-auto h-[30px] text-xs bg-dark border-[1px] rounded-md px-4 dark:text-white border-light border-solid  "
            placeholder="0"
            name="FBA_available_inventory"
            onChange={handleChange}
            // defaultValue={formData.ASIN}
          /> */}

          {"N/A"}
        </td>
        <td className="w-[10%] text-xs font-medium text-center">
          {/* <input
            type="text"
            className="w-[90%] mx-auto h-[30px] text-xs bg-dark border-[1px] rounded-md px-4 dark:text-white border-light border-solid  "
            placeholder="0"
            name="reserved_quantity"
            onChange={handleChange}
            // defaultValue={formData.ASIN}
          /> */}

          {"N/A"}
        </td>
        <td className="w-[10%] text-xs font-medium text-center">
          {/* <input
            type="text"
            className="w-[90%] mx-auto h-[30px] text-xs bg-dark border-[1px] rounded-md px-4 dark:text-white border-light border-solid  "
            placeholder="0"
            name="Inbound_to_FBA"
            onChange={handleChange}
            // defaultValue={formData.ASIN}
          /> */}

          {"N/A"}
        </td>
        <td className="w-[5%] text-xs font-medium text-center flex gap-2">
          <div
            className="cursor-pointer"
            onClick={() => handleCreateProduct(formData)}
          >
            <SaveButton />
          </div>
          <div
            className="cursor-pointer"
            onClick={() => {
              setAddingProduct(false);
              setFormData(exampleProduct);
            }}
          >
            <CancelButton />
          </div>
        </td>
      </tr>
    </tbody>
  );
};

export default NewTableRow;
