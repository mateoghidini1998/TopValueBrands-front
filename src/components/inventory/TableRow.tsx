"use client";
import { InventoryService } from "@/services/inventory/inventory";
import { ProductType } from "@/types/product.types";
import Image from "next/image";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import ConfirmAlert from "../alerts/ConfirmAlert";
import { AlertOptions } from "../alerts/ConfirmAlert";
import DotsSVG from "../svgs/DotsSVG";
import RowActions from "./Actions";
import { useProductContext } from "@/contexts/products.context";
import Link from "next/link";
import { Tooltip } from "./Tooltip";
import CustomAlert, { CustomAlertOptions } from "../alerts/CustomAlerts";
import { AiOutlineDelete, AiOutlineSave } from "react-icons/ai";
import SaveButton from "../svgs/SaveButton";
import CancelButton from "../svgs/CancelButton";
import useThemeContext from "@/contexts/theme.context";
import { useSupplierContext } from "@/contexts/suppliers.context";
import { SupplierType } from "@/types/supplier.types";
import EmptyImage from "../svgs/EmptyImage";

type TableRowProps = {
  products: ProductType[];
};

export interface EditProductType {
  seller_sku: string;
  product_cost?: number;
  supplier_id?: number;
  supplier_item_number?: string;
  pack_type?: string;
}

enum CustomAlertTheme {
  LIGHT = "light",
  DARK = "dark",
}

const TableRow = ({ products }: TableRowProps) => {
  const isDarkmode = localStorage.getItem("theme") === "dark";
  const [theme, setTheme] = useState(isDarkmode ? "dark" : "light");

  useEffect(() => {
    if (theme === "dark") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }, [theme]);

  const [isActionsOpen, setIsActionsOpen] = useState<string | null>(null);
  const [editingRow, setEditingRow] = useState<{ [key: string]: boolean }>({});
  const [savedData, setSavedData] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const dialog = useRef();
  const [currentProduct, setCurrentProduct] = useState<{
    seller_sku: string;
  }>({ seller_sku: "" });
  const [editData, setEditData] = useState<EditProductType>({
    seller_sku: "",
  });
  const { updateProduct, handleDeleteProduct } = useProductContext();
  // CustomAlert
  const [customAlertProperties, setCustomAlertProperties] = useState({
    show: false,
    type: CustomAlertOptions.SUCCESS,
    message: "",
    description: "",
    visible: false,
  });

  // Suppliers
  const { suppliers } = useSupplierContext();

  const [filterText, setFilterText] = useState<string>("");
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const [selectedSupplier, setSelectedSupplier] = useState<number | null>(
    editData.supplier_id || null
  );

  const inputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowOptions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const filteredSuppliers = suppliers.filter((supplier) =>
    supplier.supplier_name.toLowerCase().includes(filterText.toLowerCase())
  );

  const handleFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFilterText(e.target.value);
    setShowOptions(true);
  };

  const handleSelectSupplier = (supplier: SupplierType) => {
    setSelectedSupplier(supplier.id);
    setFilterText(supplier.supplier_name);
    setShowOptions(false);
    onChangeSelect({
      target: { name: "supplier_id", value: supplier.id },
    } as unknown as ChangeEvent<HTMLSelectElement>);
  };

  //Custom Alert
  const showAlert = (
    alertType: CustomAlertOptions,
    message: string,
    description: string,
    visible: boolean
  ) => {
    setCustomAlertProperties({
      show: true,
      type: alertType,
      message,
      description,
      visible,
    });
  };

  useEffect(() => {
    // add 3 seconds delay
    const timer = setTimeout(() => {
      setCustomAlertProperties({
        show: false,
        type: CustomAlertOptions.SUCCESS,
        message: "",
        description: "",
        visible: false,
      });
    }, 3000);
    return () => clearTimeout(timer);
  }, [savedData, setCustomAlertProperties]);

  const handleToggleActions = (seller_sku: string, product: ProductType) => {
    if (isActionsOpen === seller_sku) {
      setIsActionsOpen(null);
    } else {
      setIsActionsOpen(seller_sku);
    }
    setEditData(product);
  };

  const handleEdit = (seller_sku: string) => {
    setCurrentProduct({ seller_sku });
    setEditingRow({ [seller_sku]: true });
  };

  const saveEditedProduct = async () => {
    try {
      const response = await InventoryService.updateProduct({
        ...editData,
        seller_sku: currentProduct?.seller_sku ?? "",
      });

      updateProduct({
        ...editData,
        seller_sku: currentProduct.seller_sku || "",
        id: 0,
        ASIN: "",
        product_image: "",
        product_name: "",
        FBA_available_inventory: 0,
        reserved_quantity: 0,
        Inbound_to_FBA: 0,
        is_active: false,
      });
      setFilterText('');
      return response;
    } catch (error) {
      console.error("Error al actualizar el producto: ", error);
    }
    setEditingRow({});
    setIsActionsOpen(null);
  };

  const handleSave = async () => {
    if (!savedData) {
      setSavedData(true);
    }
  };

  const handleCancel = () => {
    setEditingRow({});
    setIsActionsOpen(null);
  };

  const handleDelete = async (seller_sku: string) => {
    setIsDeleting(true);
    setSavedData(true);
    setCurrentProduct(seller_sku ? { seller_sku } : { seller_sku: "" });
  };

  const deleteProduct = async () => {
    try {
      const response = await InventoryService.deactivateProduct(
        currentProduct?.seller_sku || ""
      );
      handleDeleteProduct(currentProduct?.seller_sku || "");
      return response;
    } catch (error) {
      console.error("Error al desactivar el producto: ", error);
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setEditData({
      ...editData,
      [e.target.name]: e.target.value,
    });

  const onChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setEditData({
      ...editData,
      [e.target.name]: e.target.value,
    });

  const { sidebarOpen } = useThemeContext();

  return (
    <>
      <tbody
        className={`${
          sidebarOpen ? "w-[calc(100vw-18rem)]" : "w-full"
        } mt-[160px flex flex-col items-center justify-start`}
      >
        <tr className="">
          <td>
            <CustomAlert
              theme={CustomAlertTheme.LIGHT}
              message={customAlertProperties.message}
              description={customAlertProperties.description}
              type={customAlertProperties.type}
              visible={customAlertProperties.visible}
              closable={true}
              showIcon={true}
            />
            {savedData && (
              <>
                <ConfirmAlert
                  message={
                    isDeleting
                      ? "Are you sure you want to delete this product?"
                      : "Are you sure you want to save these changes?"
                  }
                  ref={dialog}
                  onClose={() => {
                    setSavedData(false);
                    setIsDeleting(false);
                  }}
                  onConfirm={() => {
                    if (isDeleting) {
                      deleteProduct().then((result) => {
                        setIsDeleting(false);
                        setSavedData(false);
                        setIsActionsOpen(null);
                        setEditingRow({});
                        if (result) {
                          showAlert(
                            CustomAlertOptions.SUCCESS,
                            "Product deleted successfully",
                            "The product has been deleted successfully.",
                            true
                          );
                        } else {
                          showAlert(
                            CustomAlertOptions.ERROR,
                            "Error while deleting product",
                            "There was an error while deleting the product.",
                            true
                          );
                        }
                      });
                    } else {
                      saveEditedProduct().then((result) => {
                        setSavedData(false);
                        setIsActionsOpen(null);
                        setEditingRow({});
                        if (result) {
                          showAlert(
                            CustomAlertOptions.SUCCESS,
                            "Updates saved successfully",
                            "The updates have been saved successfully.",
                            true
                          );
                        } else {
                          showAlert(
                            CustomAlertOptions.ERROR,
                            "Error while saving changes",
                            "There was an error while saving the changes.",
                            true
                          );
                        }
                      });
                    }
                  }}
                  onCancel={() => {
                    setSavedData(false);
                    setIsActionsOpen(null);
                    setEditingRow({});
                    setIsDeleting(false);
                  }}
                  confirmText={AlertOptions.CONFIRM}
                  cancelText={AlertOptions.CANCEL}
                />
              </>
            )}
          </td>
        </tr>
        {Array.isArray(products) &&
          products.map((product, i) => (
            <tr
              key={product.seller_sku}
              className={`${
                i == 0 ? "mt-[60px]" : ""
              } m-0 w-full py-1 stroke-1 stroke-dark-3 flex items-center h-fit ${
                sidebarOpen ? "w-full" : "w-full"
              }  text-light bg-transparent border-b dark:border-b-dark-3 dark:text-white border-b-[#EFF1F3]`}
            >
              <td className="w-[25%] text-xs font-medium text-left p-3 h-fit">
                <div className="relative flex w-full h-full items-center justify-between text-left">
                  <div className="w-8 h-8">
                    {product.product_image ? (
                      <Link
                        target="a_blank"
                        href={`https://www.amazon.com/dp/${product.ASIN}`}
                      >
                        <Image
                          className="cover rounded-xl w-full h-full"
                          src={product.product_image}
                          width={32}
                          height={32}
                          alt="product_image"
                          // placeholder="blur"
                          blurDataURL="data:image/jpeg"
                        />
                      </Link>
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                        <EmptyImage/>
                      </div>
                      //   <span className="text-gray-500">No image</span>
                    )}
                  </div>
                  <span
                    className="text-xs limited-wrap"
                    style={{
                      cursor: "pointer",
                      position: "relative",
                      // overflow: "hidden",
                      // textOverflow: "ellipsis",
                      // whiteSpace: "nowrap",
                      width: "80%",
                    }}
                  >
                    {product.product_name}
                  </span>
                  <Tooltip product_name={product.product_name} />
                </div>
              </td>
              <td className="w-[10%] text-xs font-medium text-center">
                {product.ASIN}
              </td>
              <td className="w-[10%] text-xs font-medium text-center">
                {product.seller_sku}
              </td>
              <td className="w-[5%] text-xs font-medium text-center flex justify-center">
                {editingRow[product.seller_sku] ? (
                  <input
                    name="product_cost"
                    type="text"
                    className="w-2/3 p-1 rounded-lg text-center text-black bg-[#F8FAFC] dark:text-white dark:bg-[#262935] border-[1px] border-solid dark:border-dark-3 border-[#EFF1F3]"
                    value={editData.product_cost || ""}
                    onChange={(e) => onChange(e)}
                  />
                ) : (
                  `$ ${product.product_cost}`
                )}
              </td>
              <td className="w-[10%] text-xs font-medium text-center flex justify-center">
                {editingRow[product.seller_sku] ? (
                  <div className="relative w-2/3" ref={inputRef}>
                    <input
                      type="text"
                      value={filterText}
                      onChange={handleFilterChange}
                      onClick={() => setShowOptions(true)}
                      placeholder="Filter suppliers"
                      className="w-full p-1 rounded-lg text-center text-black bg-[#F8FAFC] dark:text-white dark:bg-[#262935] border-[1px] border-solid dark:border-dark-3 border-[#EFF1F3]"
                    />
                    {showOptions && (
                      <ul className="absolute z-10 w-full bg-[#F8FAFC] dark:bg-[#262935] border-[1px] border-solid dark:border-dark-3 border-[#EFF1F3] rounded-lg mt-1 max-h-40 overflow-y-auto no-scrollbar">
                        {filteredSuppliers.map((supplier) => (
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
                ) : (
                  suppliers.find(
                    (supplier) => supplier.id === product.supplier_id
                  )?.supplier_name
                )}
              </td>
              <td className="w-[15%] text-xs font-medium text-center flex justify-center">
                {editingRow[product.seller_sku] ? (
                  <input
                    name="supplier_item_number"
                    type="text"
                    className="w-2/3 p-1 rounded-lg text-center text-black bg-[#F8FAFC] dark:text-white dark:bg-[#262935] border-[1px] border-solid dark:border-dark-3 border-[#EFF1F3]"
                    value={editData.supplier_item_number || ""}
                    onChange={(e) => onChange(e)}
                  />
                ) : (
                  product.supplier_item_number
                )}
              </td>
              <td className="w-[5%] text-xs font-medium text-center flex justify-center">
                {editingRow[product.seller_sku] ? (
                  <input
                    name="pack_type"
                    type="text"
                    className="w-2/3 p-1 rounded-lg text-center text-black bg-[#F8FAFC] dark:text-white dark:bg-[#262935] border-[1px] border-solid dark:border-dark-3 border-[#EFF1F3]"
                    value={editData.pack_type || ""}
                    onChange={(e) => onChange(e)}
                  />
                ) : (
                  product.pack_type
                )}
              </td>
              <td className="w-[5%] text-xs font-medium text-center">
                {product.FBA_available_inventory}
              </td>
              <td className="w-[5%] text-xs font-medium text-center">
                {product.reserved_quantity}
              </td>
              <td className="w-[5%] text-xs font-medium text-center">
                {product.Inbound_to_FBA}
              </td>
              <td className="w-[5%] text-xs font-medium text-center relative">
                {!editingRow[product.seller_sku] ? (
                  <button
                    onClick={() =>
                      handleToggleActions(product.seller_sku, product)
                    }
                  >
                    {!isActionsOpen ? (
                      <DotsSVG stroke="#ADB3CC" />
                    ) : isActionsOpen === product.seller_sku ? (
                      <button onClick={() => setIsActionsOpen(null)}>❌</button>
                    ) : (
                      <DotsSVG stroke="#ADB3CC" />
                    )}
                  </button>
                ) : (
                  <div className="flex items-center justify-center gap-4">
                    <button onClick={() => handleSave()}>
                      <SaveButton />
                    </button>
                    <button onClick={() => handleCancel()}>
                      <CancelButton />
                    </button>
                  </div>
                )}

                {isActionsOpen === product.seller_sku && (
                  <RowActions
                    onClose={() => setIsActionsOpen(null)}
                    onEdit={() => {
                      handleEdit(product.seller_sku);
                      setIsActionsOpen(null);
                    }}
                    onDelete={() => {
                      handleDelete(product.seller_sku);
                      setIsActionsOpen(null);
                    }}
                  />
                )}
              </td>
            </tr>
          ))}
      </tbody>
    </>
  );
};

export default TableRow;
