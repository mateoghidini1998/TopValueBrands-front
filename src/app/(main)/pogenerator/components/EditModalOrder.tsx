import React, { useState, useEffect } from "react";
import { Modal, Form, Input, Button, Select } from "antd";
import { useOrdersContext } from "@/contexts/orders.context";
import { useSupplierContext } from "@/contexts/suppliers.context";
const { Option } = Select;

const EditOrderModal = () => {
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
        products: orderToEdit.purchaseOrderProducts.map((product) => ({
          product_id: product.product_id,
          unit_price: product.unit_price,
          quantity: product.quantity,
        })),
      });

      calculateTotalPrice(orderToEdit.purchaseOrderProducts);
    }
  }, [orderToEdit, form]);

  const calculateTotalPrice = (products:any) => {
    const totalPrice = products.reduce((total: any, product: any) => {
      return total + product.unit_price * product.quantity;
    }, 0);
    setTotalPrice(totalPrice);
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
      title="Edit Order"
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
    >
      <Form form={form} layout="vertical" name="edit_order_form">
        <Form.Item
          name="order_number"
          label="Order Number"
          rules={[
            { required: true, message: "Please input the order number!" },
          ]}
        >
          <Input disabled />
        </Form.Item>
        <Form.Item
          name="supplier_id"
          label="Supplier"
          rules={[{ required: true, message: "Please select the supplier!" }]}
        >
          <Select placeholder='Select a supplier'>
            {suppliers.map((supplier: any, index: number) => (
              <Option key={index} value={supplier.supplier_id}>
                {supplier.supplier_name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.List name="products">
          {(fields, { add, remove }) => (
            <>
              {fields.map((field, index) => (
                <Form.Item
                  {...field}
                  key={index}
                  label={`Product #${index + 1}`}
                  style={{ marginBottom: 0 }}
                >
                  <Form.Item
                    name={[field.name, "product_id"]}
                    noStyle
                    hidden
                    initialValue={form.getFieldValue(["products", index, "product_id"])}
                  >
                    <Input disabled />
                  </Form.Item>
                  <Form.Item
                    name={[field.name, "product_name"]}
                    label="Product Name"
                    initialValue={form.getFieldValue(["products", index, "product_name"])}
                  >
                    <Input disabled />
                  </Form.Item>
                  <Form.Item
                    name={[field.name, "unit_price"]}
                    label="Unit Price"
                    rules={[{ required: true, message: "Please input the unit price!" }]}
                    initialValue={form.getFieldValue(["products", index, "unit_price"])}

                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    name={[field.name, "quantity"]}
                    label="Quantity"
                    rules={[{ required: true, message: "Please input the quantity!" }]}
                    initialValue={form.getFieldValue(["products", index, "quantity"])}
                  >
                    <Input />
                  </Form.Item>
                </Form.Item>
              ))}
            </>
          )}
        </Form.List>
        <Form.Item label="Total Price">
          <Input value={totalPrice} disabled />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditOrderModal;
