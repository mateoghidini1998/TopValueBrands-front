"use client";
import { InventoryService } from "@/services/inventory/inventory";
import { ProductType } from "@/types/product.types";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import ConfirmAlert from "../alerts/ConfirmAlert";
import { AlertOptions } from "../alerts/ConfirmAlert";
import DotsSVG from "../svgs/DotsSVG";
import RowActions from "./Actions";
import { useProductContext } from "@/contexts/products.context";
import Link from "next/link";
import { Tooltip } from "./Tooltip";
import CustomAlert, { CustomAlertOptions } from "../alerts/CustomAlerts";

type TableRowProps = {
  products: ProductType[];
};

export interface EditProductType {
  seller_sku: string;
  product_cost?: number;
  supplier_name?: string;
  supplier_item_number?: string;
  pack_type?: string;
}

const TableRow = ({ products }: TableRowProps) => {
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

  return (
    <>
      <tbody>
        <tr>
          <td>

          
          <CustomAlert
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
          products.map((product) => (
            <tr
              key={product.seller_sku}
              className="py-6 stroke-1 stroke-[#393E4F] flex items-center h-[65px] w-full text-white bg-transparent border-b border-b-[#393E4F]"
            >
              <td className="w-[25%] text-xs font-medium text-center">
                <div className="relative flex flex-col w-full h-full items-center text-center">
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
                          placeholder="blur"
                          blurDataURL="data:image/jpeg"
                        />
                      </Link>
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-500">No image</span>
                      </div>
                    )}
                  </div>
                  <span
                    className="text-xs"
                    style={{
                      cursor: "pointer",
                      position: "relative",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      width: "100%",
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
                    className="w-2/3 p-1 rounded-lg text-center text-[#55597D] bg-[#262935] border-[1px] border-solid border-[#393E4F]"
                    value={editData.product_cost || ""}
                    onChange={(e) => onChange(e)}
                  />
                ) : (
                  `$ ${product.product_cost}`
                )}
              </td>
              <td className="w-[10%] text-xs font-medium text-center flex justify-center">
                {editingRow[product.seller_sku] ? (
                  <input
                    name="supplier_name"
                    type="text"
                    className="w-2/3 p-1 rounded-lg text-center text-[#55597D] bg-[#262935] border-[1px] border-solid border-[#393E4F]"
                    value={editData.supplier_name || ""}
                    onChange={(e) => onChange(e)}
                  />
                ) : (
                  product.supplier_name
                )}
              </td>
              <td className="w-[15%] text-xs font-medium text-center flex justify-center">
                {editingRow[product.seller_sku] ? (
                  <input
                    name="supplier_item_number"
                    type="text"
                    className="w-2/3 p-1 rounded-lg text-center text-[#55597D] bg-[#262935] border-[1px] border-solid border-[#393E4F]"
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
                    className="w-2/3 p-1 rounded-lg text-center text-[#55597D] bg-[#262935] border-[1px] border-solid border-[#393E4F]"
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
                    <DotsSVG />
                  </button>
                ) : (
                  <button onClick={() => handleSave()}>Save</button>
                )}

                {isActionsOpen === product.seller_sku && (
                  <RowActions
                    onEdit={() => handleEdit(product.seller_sku)}
                    onDelete={() => handleDelete(product.seller_sku)}
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
