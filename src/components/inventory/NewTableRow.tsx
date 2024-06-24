"use client";
import { useProductContext } from "@/contexts/products.context";
import useThemeContext from "@/contexts/theme.context";
import { ChangeEvent, useEffect, useState } from "react";

export interface NewProductType {
  product_name: string;
  ASIN: string;
  seller_sku: string;
  product_cost?: number;
  supplier_id?: number;
  supplier_item_number?: string;
  pack_type?: string;
}

const NewTableRow = () => {
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

  const { addingProduct, setAddingProduct, createProduct } =
    useProductContext();
  const [formData, setFormData] = useState<NewProductType>({
    product_name: exampleProduct.product_name,
    ASIN: exampleProduct.ASIN,
    seller_sku: exampleProduct.seller_sku,
    product_cost: exampleProduct.product_cost,
    supplier_id: exampleProduct.supplier_id,
    supplier_item_number: exampleProduct.supplier_item_number,
    pack_type: exampleProduct.pack_type,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCreateProduct = (newProduct: NewProductType) => {
    console.log(newProduct);
    createProduct(newProduct);
    setAddingProduct(false);
    setFormData(exampleProduct);
  };

  console.log(formData);

  return (
    <tbody
      className={`inventory_new_product_tr ${sidebarOpen ? "inventory_new_product" : ""}`}
    >
      <tr
        className={`${
          true ? "mt-[60px]" : ""
        } m-0 w-full py-1 stroke-1 stroke-dark-3 flex items-center h-[80px] ${
          sidebarOpen ? "w-full" : "w-full"
        }  text-light bg-dark  border-b dark:border-b-dark-3 dark:text-white border-b-[#EFF1F3]`}
      >
        {/* <ProductNameTableData product={product} width={"25%"} /> */}
        <td className="w-[25%] text-xs font-medium text-center">
          <input
            name="product_name"
            type="text"
            className="w-[90%] mx-auto h-[30px] text-xs bg-dark border-[1px] rounded-md px-4 text-white border-light border-solid  "
            placeholder="product name"
            onChange={handleChange}
            // defaultValue={formData.product_name}
          />
        </td>
        <td className="w-[10%] text-xs font-medium text-center">
          <input
            name="ASIN"
            type="text"
            className="w-[90%] mx-auto h-[30px] text-xs bg-dark border-[1px] rounded-md px-4 text-white border-light border-solid  "
            placeholder="ASIN"
            onChange={handleChange}
            // defaultValue={formData.ASIN}
          />
        </td>
        <td className="w-[10%] text-xs font-medium text-center">
          <input
            type="text"
            className="w-[90%] mx-auto h-[30px] text-xs bg-dark border-[1px] rounded-md px-4 text-white border-light border-solid  "
            placeholder="seller sku"
            name="seller_sku"
            onChange={handleChange}
            // defaultValue={formData.ASIN}
          />
        </td>
        <td className="w-[5%] text-xs font-medium text-center">
          <input
            type="text"
            className="w-[90%] mx-auto h-[30px] text-xs bg-dark border-[1px] rounded-md px-4 text-white border-light border-solid  "
            placeholder="cost"
            name="product_cost"
            onChange={handleChange}
            // defaultValue={formData.ASIN}
          />
        </td>
        <td className="w-[15%] text-xs font-medium text-center">
          <input
            type="text"
            className="w-[90%] mx-auto h-[30px] text-xs bg-dark border-[1px] rounded-md px-4 text-white border-light border-solid  "
            placeholder="supplier name"
            name="supplier_id"
            onChange={handleChange}
            // defaultValue={formData.supplier_id}
          />
        </td>
        <td className="w-[10%] text-xs font-medium text-center">
          <input
            type="text"
            className="w-[90%] mx-auto h-[30px] text-xs bg-dark border-[1px] rounded-md px-4 text-white border-light border-solid  "
            placeholder="supplier item number"
            onChange={handleChange}
            name="supplier_item_number"
            // defaultValue={formData.ASIN}
          />
        </td>
        <td className="w-[10%] text-xs font-medium text-center">
          <input
            type="text"
            className="w-[90%] mx-auto h-[30px] text-xs bg-dark border-[1px] rounded-md px-4 text-white border-light border-solid  "
            placeholder="pack type"
            name="pack_type"
            onChange={handleChange}
            // defaultValue={formData.ASIN}
          />
        </td>
        <td className="w-[5%] text-xs font-medium text-center">
          <input
            type="text"
            className="w-[90%] mx-auto h-[30px] text-xs bg-dark border-[1px] rounded-md px-4 text-white border-light border-solid  "
            placeholder="FBA available inventory"
            name="FBA_available_inventory"
            onChange={handleChange}
            // defaultValue={formData.ASIN}
          />
        </td>
        <td className="w-[10%] text-xs font-medium text-center">
          <input
            type="text"
            className="w-[90%] mx-auto h-[30px] text-xs bg-dark border-[1px] rounded-md px-4 text-white border-light border-solid  "
            placeholder="reserved quantity"
            name="reserved_quantity"
            onChange={handleChange}
            // defaultValue={formData.ASIN}
          />
        </td>
        <td className="w-[10%] text-xs font-medium text-center">
          <input
            type="text"
            className="w-[90%] mx-auto h-[30px] text-xs bg-dark border-[1px] rounded-md px-4 text-white border-light border-solid  "
            placeholder="Inbound to FBA"
            name="Inbound_to_FBA"
            onChange={handleChange}
            // defaultValue={formData.ASIN}
          />
        </td>
        <td className="w-[5%] text-xs font-medium text-center">
          <button
            className=""
            onClick={() => handleCreateProduct(formData)}
          >
            ✅
          </button>
          <button onClick={() => {
            setAddingProduct(false);
            setFormData(exampleProduct);
          }}>❌</button>
        </td>
      </tr>
    </tbody>
  );
};

export default NewTableRow;
