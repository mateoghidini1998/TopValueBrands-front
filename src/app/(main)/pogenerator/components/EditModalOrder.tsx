import "./EditOrderModal.css";
import classNames from "classnames";
import React, { useState, useEffect } from "react";
import { Modal, Form, Input, Button, Select, Divider } from "antd";
import { OrderProductType, useOrdersContext } from "@/contexts/orders.context";
import { useSupplierContext } from "@/contexts/suppliers.context";
const { Option } = Select;

const EditOrderModal = ({ isDarkMode }: any) => {
  const { isEditModalOpen, closeEditModal, orderToEdit, editOrder } =
    useOrdersContext();
  const { suppliers } = useSupplierContext();

  const [form] = Form.useForm();
  const [totalPrice, setTotalPrice] = useState(0);

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
          total_amount_by_product: product.quantity * product.unit_price,
        })),
      });

      calculateTotalPrice(orderToEdit.purchaseOrderProducts);
    }
  }, [orderToEdit, form]);

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

  return (
    <Modal
      title="Purchase Order"
      open={isEditModalOpen}
      onOk={handleOk}
      onCancel={closeEditModal}
      footer={[
        <Button key="back" onClick={closeEditModal}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={handleOk}>
          Save
        </Button>,
      ]}
      className={classNames({ "dark-mode": isDarkMode })}
    >
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
            rules={[{ required: true, message: "Please select the supplier!" }]}
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
              <th className="flex-1 text-left dark:text-white">Total Amount</th>
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
                    <Input disabled />
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
                <td className="flex-1 text-left">
                  <Form.Item
                    name={["products", index, "quantity"]}
                    initialValue={product.quantity}
                    rules={[
                      { required: true, message: "Please input the quantity!" },
                    ]}
                  >
                    <Input type="number" />
                  </Form.Item>
                </td>
                <td className="flex-1 text-left">
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
                    // initialValue={(
                    //   product.quantity * product.unit_price
                    // ).toLocaleString()}
                  >
                    <Input
                      disabled
                      value={(
                        product.quantity * product.unit_price
                      ).toLocaleString()}
                    />
                    {/* <p>
                      ${" "}
                      {(product.quantity * product.unit_price).toLocaleString()}
                    </p> */}
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
          <Input value={`$ ${totalPrice.toLocaleString()}`} disabled />
        </Form.Item>

        <Form.Item name="notes" label="Notes" initialValue={orderToEdit?.notes}>
          <Input.TextArea />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditOrderModal;
