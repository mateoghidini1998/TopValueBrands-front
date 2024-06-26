import React, { useState, useEffect } from "react";
import { Modal, Form, Input, Button, Select, Divider } from "antd";
import { OrderProductType, useOrdersContext } from "@/contexts/orders.context";
import { useSupplierContext } from "@/contexts/suppliers.context";
import { ProductType } from "@/types/product.types";
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
        notes: orderToEdit.notes,
        products: orderToEdit.purchaseOrderProducts.map((product) => ({
          product_id: product.product_id,
          unit_price: product.unit_price,
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
      const updatedProducts = allValues.products.map(
        (product: ProductType) => ({
          ...product,
          total_amount_by_product:
            (product.quantity || 0) * (product.unit_price || 0),
        })
      );
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
      <Form
        form={form}
        layout="vertical"
        name="edit_order_form"
        onValuesChange={handleValuesChange}
      >
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
          <Select placeholder="Select a supplier">
            {suppliers.map((supplier, index) => (
              <Option key={index} value={supplier.id}>
                {supplier.supplier_name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.List name="products">
          {(fields) => (
            <>
              {fields.map((field, index) => (
                <Form.Item
                  {...field}
                  key={index}
                  label={`Product #${index + 1}`}
                  style={{ marginBottom: 0 }}
                >
                  <Form.Item name={[field.name, "product_id"]} noStyle hidden>
                    <Input disabled />
                  </Form.Item>
                  <Form.Item
                    name={[field.name, "product_name"]}
                    label="Product Name"
                  >
                    <Input disabled />
                  </Form.Item>
                  <Form.Item
                    name={[field.name, "unit_price"]}
                    label="Unit Price"
                    rules={[
                      {
                        required: true,
                        message: "Please input the unit price!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    name={[field.name, "quantity"]}
                    label="Quantity"
                    rules={[
                      { required: true, message: "Please input the quantity!" },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    name={[field.name, "total_amount_by_product"]}
                    label="Total"
                  >
                    <Input disabled />
                  </Form.Item>
                </Form.Item>
              ))}
            </>
          )}
        </Form.List>
        <Divider className="bg-dark" />
        <Form.Item
          label="Total Price"
          style={{ marginBottom: 0, fontWeight: "bold", fontSize: "18px" }}
        >
          <Input value={totalPrice} disabled />
        </Form.Item>

        <Form.Item
          name="notes"
          label="Notes"
          // rules={[{ required: true, message: "Please input the notes!" }]}
          initialValue={orderToEdit?.notes}
        >
          <Input.TextArea />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditOrderModal;
