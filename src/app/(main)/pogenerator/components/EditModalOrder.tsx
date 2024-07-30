import "./EditOrderModal.css";
import classNames from "classnames";
import React, { useState, useEffect } from "react";
import { Modal, Form, Input, Button, Select, Divider } from "antd";
import { OrderProductType, useOrdersContext } from "@/contexts/orders.context";
import { useSupplierContext } from "@/contexts/suppliers.context";
import TextArea from "antd/es/input/TextArea";
import { TableComponent } from "./TableComponent";
import { Column } from "../interfaces/ITableComponent";
import { TrackedProductType } from "@/types/trackedProducts.types";
import IndexPageContainer from "../../page.container";
import { useTrackedProductContext } from "@/contexts/trackedProducts.context";
import { ProductInOrder } from "../../../../contexts/trackedProducts.context";
const { Option } = Select;

const columns: Column[] = [
  { key: "product_name", name: "Product", width: "20%" },
  { key: "ASIN", name: "ASIN", width: "150px" },
  { key: "seller_sku", name: "Amazon SKU", width: "150px" },
  { key: "supplier_name", name: "Supplier Name", width: "150px" },
  { key: "thirty_days_rank", name: "30 Day Rank", width: "150px" },
  { key: "ninety_days_rank", name: "90 Day Rank", width: "150px" },
  { key: "units_sold", name: "Units Sold", width: "150px" },
  { key: "product_velocity", name: "Velocity", width: "150px" },
  { key: "lowest_fba_price", name: "FBA Price ", width: "150px" },
  { key: "fees", name: "Fees", width: "150px" },
  { key: "product_cost", name: "Product Cost", width: "150px" },
  { key: "profit", name: "Profit", width: "150px" },
  { key: "roi", name: "ROI", width: "100px" },
  { key: "updatedAt", name: "Last Update", width: "150px" },
];

const EditOrderModal = ({ isDarkMode }: any) => {
  const { isEditModalOpen, closeEditModal, orderToEdit, editOrder } =
    useOrdersContext();
  const { suppliers } = useSupplierContext();
  const {
    trackedProducts,
    handleNextPage,
    handlePreviousPage,
    totalPages,
    currentPage,
    setCurrentPage,
  } = useTrackedProductContext();

  const [form] = Form.useForm();
  const [totalPrice, setTotalPrice] = useState(0);

  const [isAnalyzing, setIsAnalyzing] = useState(false);

  useEffect(() => {
    if (orderToEdit) {
      form.setFieldsValue({
        order_number: orderToEdit.order_number,
        supplier_id: orderToEdit.supplier_id,
        notes: orderToEdit.notes,
        products: orderToEdit.purchaseOrderProducts.map((product) => ({
          product_id: product.product_id,
          unit_price: Number(product.unit_price),
          product_name: product.product_name,
          quantity: product.quantity,
          total_amount_by_product: (
            product.quantity * product.unit_price
          ).toFixed(2),
        })),
      });

      calculateTotalPrice(orderToEdit.purchaseOrderProducts);
    }
  }, [orderToEdit, form]);

  console.log(orderToEdit?.purchaseOrderProducts);

  const getTrackedProductFromTheOrder = (trackedProductsArr: any) => {
    const productsInOrder = orderToEdit?.purchaseOrderProducts;

    const productsInOrderIds = productsInOrder?.map(
      (product: any) => product.product_id
    );

    // get the trackedProducts where the product_id === productsInOrderIds
    const trackedProducts = trackedProductsArr?.filter((product: any) =>
      productsInOrderIds?.includes(product?.product_id)
    );

    return trackedProducts;
  };

  console.log(getTrackedProductFromTheOrder(trackedProducts));

  const calculateTotalPrice = (products: OrderProductType[]) => {
    const totalPrice = products.reduce(
      (total: number, product: OrderProductType) => {
        return total + (product?.unit_price || 0) * (product?.quantity || 0);
      },
      0
    );
    setTotalPrice(totalPrice);
  };

  const handleValuesChange = (changedValues: any, allValues: any) => {
    if (changedValues.products) {
      const updatedProducts = allValues.products.map((product: any) => ({
        ...product,
        total_amount_by_product:
          (product.quantity || 0) * (product.unit_price || 0),
      }));
      form.setFieldsValue({ products: updatedProducts });
      calculateTotalPrice(updatedProducts);
    }
  };

  const handleOk = () => {
    form.validateFields().then((values) => {
      if (orderToEdit) {
        editOrder(orderToEdit.id, values);
      }
    });
  };

  const handleCloseEditModal = () => {
    closeEditModal();
    setIsAnalyzing(false);
  };

  const handleAnalyzeOrder = () => {
    setIsAnalyzing(!isAnalyzing);
  };

  return (
    <Modal
      style={isAnalyzing ? { top: 100 } : {}}
      title="Purchase Order"
      open={isEditModalOpen}
      onOk={handleOk}
      onCancel={handleCloseEditModal}
      closeIcon={<span id="close-icon">❌</span>}
      footer={[
        <Button
          className="bg-emerald-300 hover:none text-black mr-10"
          key="analyze"
          type="link"
          onClick={handleAnalyzeOrder}
        >
          {isAnalyzing ? "See Order" : "Analyze"}
        </Button>,
        <Button
          key="back"
          className={`${isAnalyzing ? "hidden" : ""}`}
          onClick={handleCloseEditModal}
        >
          Cancel
        </Button>,
        <Button
          key="submit"
          type="primary"
          className={`${isAnalyzing ? "hidden" : ""}`}
          onClick={handleOk}
        >
          Save
        </Button>,
      ]}
      className={classNames({ "dark-mode": isDarkMode })}
    >
      {isAnalyzing ? (
        <IndexPageContainer>
          <TableComponent<TrackedProductType>
            hasOrderFilds={true}
            columns={columns}
            data={getTrackedProductFromTheOrder(trackedProducts)}
            nextPage={() => {}}
            previousPage={() => {}}
            totalPages={1}
            setCurrentPage={() => {}}
            currentPage={1}
          />
        </IndexPageContainer>
      ) : (
        <Form
          form={form}
          layout="vertical"
          name="edit_order_form"
          onValuesChange={handleValuesChange}
          className="flex flex-col items-start justify-between"
        >
          <div className="w-full flex items-center justify-left gap-2">
            <Form.Item
              name="order_number"
              label="Order Number"
              rules={[
                { required: true, message: "Please input the order number!" },
              ]}
            >
              <Input
                className="text-dark cursor-not-allowed border-solid border-[1px] border-[#ef2b2b]"
                disabled
              />
            </Form.Item>
            <Form.Item
              name="supplier_id"
              label="Supplier"
              rules={[
                { required: true, message: "Please select the supplier!" },
              ]}
            >
              <h3 className="dark:text-white">{orderToEdit?.supplier_name}</h3>
            </Form.Item>
          </div>

          <table className="w-full flex flex-col items-center justify-normal">
            <thead className="w-full mb-6">
              <tr className="w-full flex items-center justify-between">
                <th className="flex-1 text-left dark:text-white">Product</th>
                <th className="flex-1 text-left dark:text-white">Product ID</th>
                <th className="flex-1 text-left dark:text-white">Quantity</th>
                <th className="flex-1 text-left dark:text-white">Unit Price</th>
                <th className="flex-1 text-left dark:text-white">
                  Total Amount
                </th>
              </tr>
            </thead>
            <tbody className="w-full">
              {orderToEdit?.purchaseOrderProducts.map((product, index) => (
                <tr
                  key={index}
                  className="w-full flex items-center justify-between"
                >
                  <td className="flex-1 text-left">
                    <Form.Item
                      name={["products", index, "product_name"]}
                      initialValue={product.product_name}
                      rules={[
                        {
                          required: true,
                          message: "Please input the product name!",
                        },
                      ]}
                    >
                      <Input className="w-full h-full" disabled />
                    </Form.Item>
                  </td>
                  <td className="flex-1 text-left">
                    <Form.Item
                      name={["products", index, "product_id"]}
                      initialValue={product.product_id}
                    >
                      <Input disabled />
                    </Form.Item>
                  </td>
                  <td className="flex-1 flex text-left">
                    <span>✏️</span>
                    <Form.Item
                      name={["products", index, "quantity"]}
                      initialValue={product.quantity}
                      rules={[
                        {
                          required: true,
                          message: "Please input the quantity!",
                        },
                      ]}
                    >
                      <Input type="number" />
                    </Form.Item>
                  </td>
                  <td className="flex-1 flex text-left">
                    <span>✏️</span>
                    <Form.Item
                      name={["products", index, "unit_price"]}
                      initialValue={product.unit_price}
                      rules={[
                        {
                          required: true,
                          message: "Please input the unit price!",
                        },
                      ]}
                    >
                      <Input type="number" />
                    </Form.Item>
                  </td>
                  <td className="flex-1 text-left">
                    <Form.Item
                      name={["products", index, "total_amount_by_product"]}
                    >
                      <Input
                        disabled
                        value={(product.quantity * product.unit_price).toFixed(
                          2
                        )}
                      />
                    </Form.Item>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <Divider className="bg-dark" />
          <Form.Item
            label="Total Price"
            style={{ marginBottom: 0, fontWeight: "bold", fontSize: "18px" }}
          >
            <Input
              value={`$ ${totalPrice.toFixed(2).toLocaleString()}`}
              disabled
            />
          </Form.Item>

          <Form.Item
            name="notes"
            label="Notes"
            initialValue={orderToEdit?.notes}
          >
            <Input.TextArea />
          </Form.Item>
        </Form>
      )}
    </Modal>
  );
};

export default EditOrderModal;
