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
  id: string;
  product_name?: string;
  ASIN?: string;
  product_image: string;
  seller_sku: string;
  product_cost?: number;
  supplier_id?: number;
  supplier_item_number?: string;
  pack_type?: string;
  FBA_available_inventory?: number;
  reserved_quantity?: number;
  Inbound_to_FBA?: number;
}

enum CustomAlertTheme {
  LIGHT = "light",
  DARK = "dark",
}

const TableRow = ({ products }: TableRowProps) => {
  const [isActionsOpen, setIsActionsOpen] = useState<string | null>(null);
  const [editingRow, setEditingRow] = useState<{ [key: string]: boolean }>({});
  const [savedData, setSavedData] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const dialog = useRef();
  const [currentProduct, setCurrentProduct] = useState<{
    id: string;
  }>({ id: "" });
  const [editData, setEditData] = useState<ProductType>({
    id: "",
    product_name: "",
    ASIN: "",
    product_image: "",
    seller_sku: "",
    is_active: true,
    product_cost: 0,
    supplier_id: 0,
    supplier_item_number: "",
    pack_type: "",
    FBA_available_inventory: 0,
    reserved_quantity: 0,
    Inbound_to_FBA: 0,
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

  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [tooltipText, setTooltipText] = useState<string>("");
  const spanRef = useRef<HTMLSpanElement>(null);

  const handleMouseEnter = (product_name: string) => {
    setTooltipText(product_name);
    setTooltipVisible(true);
  };

  const handleMouseLeave = () => {
    setTooltipText("");
    setTooltipVisible(false);
  };

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

  const handleToggleActions = (id: string, product: ProductType) => {
    if (isActionsOpen === id) {
      setIsActionsOpen(null);
    } else {
      setIsActionsOpen(id);
    }
    setEditData(product);
  };

  const handleEdit = (id: string) => {
    setCurrentProduct({ id });
    setEditingRow({ [id]: true });
  };

  const handleEditProduct = async () => {
    try {
      const response = await updateProduct(editData);
      setFilterText("");
      return response;
    } catch (error) {
      console.error("Error al actualizar el producto: ", error);
    }
    setIsActionsOpen(null);
    setEditingRow({});

    return null;
  };

  const handleSave = async () => {
    if (!savedData) {
      setSavedData(true);
    }
  };

  const handleCancel = () => {
    setEditingRow({});
    setIsActionsOpen(null);
    setFilterText("");
  };

  const handleDelete = async (id: string) => {
    setIsDeleting(true);
    setSavedData(true);
    setCurrentProduct(id ? { id } : { id: "" });
  };

  const deleteProduct = async () => {
    try {
      const response = await InventoryService.deactivateProduct(
        currentProduct?.id || ""
      );
      handleDeleteProduct(currentProduct?.id || "");
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
  const onChangeTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setEditData({
      ...editData,
      [e.target.name]: e.target.value,
    });

  const onChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setEditData({
      ...editData,
      [e.target.name]: e.target.value,
    });

  const { sidebarOpen, theme } = useThemeContext();

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
              theme={theme}
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
                            "There was an error while deleting the product?.",
                            true
                          );
                        }
                      });
                    } else {
                      handleEditProduct().then((result) => {
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
          products.map((product: any, i) => (
            <tr
              key={product?.id}
              className={`${i == 0 ? "mt-[60px]" : ""} 
                m-0 w-full py-1 stroke-1 stroke-dark-3 flex items-center h-fit ${sidebarOpen ? "w-full" : "w-full"}
                 text-light bg-transparent border-b dark:border-b-dark-3 dark:text-white border-b-[#EFF1F3]`}
            >
              {/* Product Image and Product Name */}
              <td
                style={{ width: "25%" }}
                className={` text-xs font-medium text-left p-3 h-fit relative`}
              >
                <div className="relative flex w-full h-full items-center justify-between text-left">
                  <div className="w-8 h-8">
                    {product?.product_image ? (
                      <Link
                        target="a_blank"
                        href={`https://www.amazon.com/dp/${product?.ASIN}`}
                      >
                        <Image
                          loading="lazy"
                          className="cover rounded-xl w-full h-full"
                          src={product?.product_image}
                          width={32}
                          height={32}
                          alt="product_image"
                          blurDataURL="data:image/jpeg"
                        />
                      </Link>
                    ) : (
                      <div className="w-full h-full bg-light-2 shadow-sm dark:bg-dark-2 rounded-lg flex items-center justify-center">
                        <EmptyImage />
                      </div>
                    )}
                  </div>
                  <span
                    ref={spanRef}
                    className="text-xs limited-wrap"
                    style={{
                      cursor: "pointer",
                      position: "relative",
                      width: "80%",
                    }}
                    onMouseEnter={() => {
                      !editingRow[product?.id] &&
                        handleMouseEnter(product?.product_name);
                    }}
                    onMouseLeave={handleMouseLeave}
                  >
                    {editingRow[product?.id] ? (
                      <textarea
                        name="product_name"
                        // type="text"
                        className="w-full p-1 rounded-lg text-center text-black bg-[#F8FAFC] dark:text-white dark:bg-[#262935] border-[1px] border-solid dark:border-dark-3 border-[#EFF1F3]"
                        value={editData.product_name || ""}
                        onChange={(e) => onChangeTextArea(e)}
                      />
                    ) : (
                      product?.product_name
                    )}
                  </span>
                </div>
                {tooltipVisible && tooltipText === product?.product_name && (
                  <Tooltip
                    product_name={product?.product_name}
                    visible={tooltipVisible}
                  />
                )}
              </td>
              <td className="w-[10%] text-xs font-medium text-center">
                {editingRow[product?.id] ? (
                  <input
                    name="ASIN"
                    type="text"
                    className="w-2/3 p-1 rounded-lg text-center text-black bg-[#F8FAFC] dark:text-white dark:bg-[#262935] border-[1px] border-solid dark:border-dark-3 border-[#EFF1F3]"
                    value={editData.ASIN || ""}
                    onChange={(e) => onChange(e)}
                  />
                ) : (
                  product?.ASIN
                )}
              </td>
              <td className="w-[10%] text-xs font-medium text-center">
                {editingRow[product?.id] ? (
                  <input
                    name="seller_sku"
                    type="text"
                    className="w-2/3 p-1 rounded-lg text-center text-black bg-[#F8FAFC] dark:text-white dark:bg-[#262935] border-[1px] border-solid dark:border-dark-3 border-[#EFF1F3]"
                    value={editData.seller_sku || ""}
                    onChange={(e) => onChange(e)}
                  />
                ) : (
                  `${product?.seller_sku}`
                )}
              </td>
              <td className="w-[5%] text-xs font-medium text-center flex justify-center">
                {editingRow[product?.id] ? (
                  <input
                    name="product_cost"
                    type="text"
                    className="w-2/3 p-1 rounded-lg text-center text-black bg-[#F8FAFC] dark:text-white dark:bg-[#262935] border-[1px] border-solid dark:border-dark-3 border-[#EFF1F3]"
                    value={editData.product_cost || ""}
                    onChange={(e) => onChange(e)}
                  />
                ) : (
                  `$ ${product?.product_cost}`
                )}
              </td>
              <td className="w-[15%] text-xs font-medium text-center flex justify-center">
                {editingRow[product?.id] ? (
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
                    (supplier) => supplier.id === product?.supplier_id
                  )?.supplier_name
                )}
              </td>
              <td className="w-[10%] text-xs font-medium text-center flex justify-center">
                {editingRow[product?.id] ? (
                  <input
                    name="supplier_item_number"
                    type="text"
                    className="w-2/3 p-1 rounded-lg text-center text-black bg-[#F8FAFC] dark:text-white dark:bg-[#262935] border-[1px] border-solid dark:border-dark-3 border-[#EFF1F3]"
                    value={editData.supplier_item_number || ""}
                    onChange={(e) => onChange(e)}
                  />
                ) : (
                  product?.supplier_item_number
                )}
              </td>
              <td className="w-[10%] text-xs font-medium text-center flex justify-center">
                {editingRow[product?.id] ? (
                  <input
                    name="pack_type"
                    type="text"
                    className="w-2/3 p-1 rounded-lg text-center text-black bg-[#F8FAFC] dark:text-white dark:bg-[#262935] border-[1px] border-solid dark:border-dark-3 border-[#EFF1F3]"
                    value={editData.pack_type || ""}
                    onChange={(e) => onChange(e)}
                  />
                ) : (
                  product?.pack_type
                )}
              </td>
              <td className="w-[5%] text-xs font-medium text-center">
                {product?.FBA_available_inventory}

                {/* {editingRow[product?.id] ? (
                  <input
                    name="FBA_available_inventory"
                    type="text"
                    className="w-2/3 p-1 rounded-lg text-center text-black bg-[#F8FAFC] dark:text-white dark:bg-[#262935] border-[1px] border-solid dark:border-dark-3 border-[#EFF1F3]"
                    value={editData.FBA_available_inventory || ""}
                    onChange={(e) => onChange(e)}
                  />
                ) : (
                  product?.FBA_available_inventory
                )} */}
              </td>
              <td className="w-[10%] text-xs font-medium text-center">
                {product?.reserved_quantity}

                {/* {editingRow[product?.id] ? (
                  <input
                    name="reserved_quantity"
                    type="text"
                    className="w-2/3 p-1 rounded-lg text-center text-black bg-[#F8FAFC] dark:text-white dark:bg-[#262935] border-[1px] border-solid dark:border-dark-3 border-[#EFF1F3]"
                    value={editData.reserved_quantity || ""}
                    onChange={(e) => onChange(e)}
                  />
                ) : (
                  product?.reserved_quantity
                )} */}
              </td>
              <td className="w-[10%] text-xs font-medium text-center">
                {product?.Inbound_to_FBA}

                {/* {editingRow[product?.id] ? (
                  <input
                    name="Inbound_to_FBA"
                    type="text"
                    className="w-2/3 p-1 rounded-lg text-center text-black bg-[#F8FAFC] dark:text-white dark:bg-[#262935] border-[1px] border-solid dark:border-dark-3 border-[#EFF1F3]"
                    value={editData.Inbound_to_FBA || ""}
                    onChange={(e) => onChange(e)}
                  />
                ) : (
                  product?.Inbound_to_FBA
                )} */}
              </td>
              <td className="w-[5%] text-xs font-medium text-right relative">
                {!editingRow[product?.id] ? (
                  <button
                    onClick={() => handleToggleActions(product?.id, product)}
                  >
                    {!isActionsOpen ? (
                      <DotsSVG stroke="#ADB3CC" />
                    ) : isActionsOpen === product?.id ? (
                      <div onClick={() => setIsActionsOpen(null)}>
                        <DotsSVG stroke="#ADB3CC" />
                      </div>
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

                {isActionsOpen === product?.id && (
                  <RowActions
                    onClose={() => setIsActionsOpen(null)}
                    onEdit={() => {
                      handleEdit(product?.id);
                      setIsActionsOpen(null);
                    }}
                    onDelete={() => {
                      handleDelete(product?.id);
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
