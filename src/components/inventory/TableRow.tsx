"use client";
import { InventoryService } from "@/services/inventory/inventory";
import { ProductType } from "@/types/product.types";
import Image from "next/image";
import { useState } from "react";
import { AlertOptions, ConfirmAlert } from "../alerts/ConfirmAlert";
import DotsSVG from "../svgs/DotsSVG";
import RowActions from "./Actions";
import { useProductContext } from "@/contexts/products.context";
import Link from "next/link";

type TableRowProps = {
  products: ProductType[];
};

const TableRow = ({ products }: TableRowProps) => {
  const [isActionsOpen, setIsActionsOpen] = useState<string | null>(null);
  const [editingRow, setEditingRow] = useState<{ [key: string]: boolean }>({});
  const [savedData, setSavedData] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<{
    seller_sku: string;
  } | null>(null);
  const [editData, setEditData] = useState({});
  const { updateProduct, handleDeleteProduct } = useProductContext();

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
      updateProduct({ ...editData, seller_sku: currentProduct?.seller_sku });
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
    setCurrentProduct(seller_sku ? { seller_sku } : null);
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

  const onChange = (e) =>
    setEditData({
      ...editData,
      [e.target.name]: e.target.value,
    });

  return (
    <>
      {savedData && (
        <>
          <ConfirmAlert
            message="Are you sure you want to save the changes?"
            onClose={() => setSavedData(false)}
            onConfirm={() => {
              if (isDeleting) {
                deleteProduct().then((result) => {
                  console.log(currentProduct);

                  if (result) {
                    setIsDeleting(false);
                    setSavedData(false);
                    setIsActionsOpen(null);
                    setEditingRow({});
                  }
                });
              } else {
                saveEditedProduct().then((result) => {
                  if (result) {
                    setSavedData(false);
                    setIsActionsOpen(null);
                    setEditingRow({});
                  }
                });
              }
            }}
            onCancel={() => {
              setSavedData(false);
              setIsActionsOpen(null);
              setEditingRow({});
            }}
            confirmText={AlertOptions.CONFIRM}
            cancelText={AlertOptions.CANCEL}
          />
        </>
      )}
      {Array.isArray(products) &&
        products.map((product) => (
          <tr
            key={product.seller_sku}
            className="py-6 stroke-1 stroke-[#393E4F] flex items-center h-[65px] w-full text-white bg-transparent border-b border-b-[#393E4F]"
          >
            <td className="w-[25%] text-xs font-medium text-center">
              <div className="flex flex-col w-full h-full items-center text-center">
                <div className="w-8 h-8">
                  {product.product_image ? (
                    <Link target="a_blank" href={`https://www.amazon.com/dp/${product.ASIN}`}>
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
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    width: "250px",
                  }}
                >
                  {product.product_name}
                </span>
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
                  value={editData.product_cost}
                  onChange={(e) => onChange(e)}
                />
              ) : (
                product.product_cost
              )}
            </td>
            <td className="w-[10%] text-xs font-medium text-center flex justify-center">
              {editingRow[product.seller_sku] ? (
                <input
                  name="supplier_name"
                  type="text"
                  className="w-2/3 p-1 rounded-lg text-center text-[#55597D] bg-[#262935] border-[1px] border-solid border-[#393E4F]"
                  value={editData.supplier_name}
                  onChange={(e) => onChange(e)}
                />
              ) : (
                product.supplier_name
              )}
            </td>
            <td className="w-[10%] text-xs font-medium text-center flex justify-center">
              {editingRow[product.seller_sku] ? (
                <input
                  name="supplier_item_number"
                  type="text"
                  className="w-2/3 p-1 rounded-lg text-center text-[#55597D] bg-[#262935] border-[1px] border-solid border-[#393E4F]"
                  value={editData.supplier_item_number}
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
                  value={editData.pack_type}
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
            <td className="w-[10%] text-xs font-medium text-center relative">
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
    </>
  );
};

export default TableRow;
