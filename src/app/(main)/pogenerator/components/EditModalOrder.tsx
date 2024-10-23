import { OrderProductType, useOrdersContext } from "@/contexts/orders.context";
import { useTrackedProductContext } from "@/contexts/trackedProducts.context";
import { TrackedProductType } from "@/types/trackedProducts.types";
import { Button, Form, Input, Modal } from "antd";
import classNames from "classnames";
import { useEffect, useState } from "react";
import IndexPageContainer from "../../page.container";
import { Column } from "../interfaces/ITableComponent";
import "./EditOrderModal.css";
import { TableComponent } from "./TableComponent";
import { MdOutlineEdit } from "react-icons/md";
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
  { key: "FBA_available_inventory", name: "FBA Stock", width: "90px" },
  { key: "reserved_quantity", name: "Reserved Stock", width: "90px" },
  { key: "Inbound_to_FBA", name: "Inbound FBA", width: "90px" },
  { key: "supplier_item_number", name: "Supplier item No", width: "90px" },
  { key: "profit", name: "Profit", width: "150px" },
  { key: "roi", name: "ROI", width: "100px" },
  { key: "updatedAt", name: "Last Update", width: "150px" },
];

const EditOrderModal = ({ isDarkMode }: any) => {
  const { isEditModalOpen, closeEditModal, orderToEdit, editOrder } =
    useOrdersContext();
  const { trackedProductsToAnalyze, getTrackedProductsFromAnOrder } =
    useTrackedProductContext();

  const [form] = Form.useForm();
  const [totalPrice, setTotalPrice] = useState(0);
  const [products, setProducts] = useState<OrderProductType[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const [showProductCostInput, setShowProductCostInput] = useState(false);
  const [showProductQuantityInput, setShowProductQuantityInput] =
    useState(false);

  useEffect(() => {
    if (orderToEdit) {
      const initialProducts = orderToEdit.purchaseOrderProducts.map(
        (product) => ({
          ...product,
          unit_price: Number(product.unit_price).toFixed(2),
          total_amount_by_product: (
            product.quantity_purchased * product.unit_price
          ).toFixed(2),
        })
      );

      form.setFieldsValue({
        order_number: orderToEdit.order_number,
        supplier_id: orderToEdit.supplier_id,
        notes: orderToEdit.notes,
        products: initialProducts,
      });

      setProducts(initialProducts as any);
      calculateTotalPrice(initialProducts as any);
    }
  }, [orderToEdit, form]);

  useEffect(() => {
    getTrackedProductsFromAnOrder(orderToEdit?.id || 0);
  }, [getTrackedProductsFromAnOrder, orderToEdit?.id]);

  const calculateTotalPrice = (products: OrderProductType[]) => {
    const totalPrice = products.reduce(
      (total: number, product: OrderProductType) =>
        total +
        (Number(product.unit_price) || 0) * (product.quantity_purchased || 0),
      0
    );
    setTotalPrice(totalPrice);
  };

  const handleProductChange = (index: number, field: string, value: any) => {
    const updatedProducts = [...products];
    updatedProducts[index] = {
      ...updatedProducts[index],
      [field]: field === "unit_price" ? parseFloat(value) : Number(value),
      total_amount_by_product:
        (field === "unit_price"
          ? parseFloat(value)
          : updatedProducts[index].unit_price) *
        (field === "quantity"
          ? Number(value)
          : updatedProducts[index].quantity_purchased),
    };
    setProducts(updatedProducts);
    calculateTotalPrice(updatedProducts);
  };

  const handleOk = () => {
    form.validateFields().then((values) => {
      if (orderToEdit) {
        editOrder(orderToEdit.id, { ...values, products });
      }
    });
    setShowProductQuantityInput(true);
    setShowProductCostInput(true);
  };

  const handleCloseEditModal = () => {
    closeEditModal();
    setIsAnalyzing(false);
    setShowProductQuantityInput(false);
    setShowProductCostInput(false);
  };

  const handleAnalyzeOrder = () => {
    setIsAnalyzing(!isAnalyzing);
  };

  return (
    <Modal
      style={isAnalyzing ? { top: 100 } : {}}
      title="Order Summary"
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
            data={trackedProductsToAnalyze}
            nextPage={() => {}}
            previousPage={() => {}}
            totalPages={1}
            setCurrentPage={() => {}}
            currentPage={1}
          />
        </IndexPageContainer>
      ) : (
        <section className="w-full h-full flex flex-col gap-4 bg-[#2A2D38]">
          {/*
            
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

            */}
          <div className="custom-scrollbar w-full max-h-[400px] border-solid border-[1px] rounded-md border-light-3 dark:border-dark-3 overflow-y-scroll p-4">
            {trackedProductsToAnalyze.map((product: any, index: number) => {
              console.log(product);
              return (
                // should be a component
                <div
                  key={index}
                  className="flex flex-col item-center justify-start mb-4"
                >
                  <div className="flex items-center text-left gap-4">
                    <p className="w-[100px]">Product</p>
                    <p className="dark:text-white text-nowrap">
                      {product.product_name}
                    </p>
                  </div>

                  <div className="flex items-center text-left gap-4">
                    <p className="w-[100px]">ASIN</p>
                    <p className="dark:text-white">{product.ASIN}</p>
                  </div>

                  <div className="flex items-center text-left gap-4">
                    <p className="w-[100px]">Amazon SKU</p>
                    <p className="dark:text-white">{product.seller_sku}</p>
                  </div>

                  <div className="flex items-center text-left gap-4">
                    <p className="w-[100px]">Current Rank</p>
                    <p className="dark:text-white">{product.current_rank}</p>
                  </div>

                  <div className="flex items-center text-left gap-4">
                    <p className="w-[100px]">30 Day Rank</p>
                    <p className="dark:text-white">
                      {product.thirty_days_rank}
                    </p>
                  </div>

                  <div className="flex items-center text-left gap-4">
                    <p className="w-[100px]">90 Day Rank</p>
                    <p className="dark:text-white">
                      {product.ninety_days_rank}
                    </p>
                  </div>

                  <div className="flex items-center text-left gap-4">
                    <p className="w-[100px]">Units Sold</p>
                    <p className="dark:text-white">{product.units_sold}</p>
                  </div>

                  <div className="flex items-center text-left gap-4">
                    <p className="w-[100px]">Velocity</p>
                    <p className="dark:text-white">
                      {product.product_velocity}
                    </p>
                  </div>

                  <div className="flex items-center text-left gap-4">
                    <p className="w-[100px]">Unit Price</p>

                    {showProductCostInput ? (
                      <>
                        <Input
                          className="w-[100px]"
                          defaultValue={
                            orderToEdit?.purchaseOrderProducts.find(
                              (po: any) => {
                                return po.product_id === product.product_id;
                              }
                            )?.unit_price
                          }
                          onChange={(e) =>
                            handleProductChange(
                              index,
                              "unit_price",
                              e.target.value
                            )
                          }
                        />
                      </>
                    ) : (
                      <>
                        <span
                          className="cursor-pointer"
                          onClick={() => setShowProductCostInput(true)}
                        >
                          <MdOutlineEdit />
                        </span>
                        ${" "}
                        {Number(
                          orderToEdit?.purchaseOrderProducts.find((po: any) => {
                            return po.product_id === product.product_id;
                          })?.unit_price
                        ).toFixed(2)}
                      </>
                    )}
                  </div>
                  <div className="flex items-center text-left gap-4">
                    <p className="w-[100px]">Quantity</p>
                    {showProductQuantityInput ? (
                      <>
                        <Input
                          className="w-[100px]"
                          defaultValue={
                            orderToEdit?.purchaseOrderProducts.find(
                              (po: any) => {
                                return po.product_id === product.product_id;
                              }
                            )?.quantity_purchased || 0
                          }
                          onChange={(e) =>
                            handleProductChange(
                              index,
                              "quantity",
                              e.target.value
                            )
                          }
                        />
                      </>
                    ) : (
                      <>
                        <span
                          className="cursor-pointer"
                          onClick={() => setShowProductQuantityInput(true)}
                        >
                          <MdOutlineEdit />
                        </span>
                        {orderToEdit?.purchaseOrderProducts.find((po: any) => {
                          return po.product_id === product.product_id;
                        })?.quantity_purchased || 0}
                      </>
                    )}
                  </div>
                  <div className="flex items-center text-left gap-4">
                    <p className="w-[100px]">Total Price</p>
                    <p className="dark:text-white">
                      <span>$ </span>
                      {Number(
                        (orderToEdit?.purchaseOrderProducts.find((po: any) => {
                          return po.product_id === product.product_id;
                        })?.unit_price ?? 0) *
                          (orderToEdit?.purchaseOrderProducts.find(
                            (po) => po.product_id === product.product_id
                          )?.quantity_purchased ?? 0)
                      )
                        .toFixed(2)
                        .toLocaleString()}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div>
            <div className="flex items-center text-left gap-4">
              <p className="w-[100px]">Notes</p>
              <p className="dark:text-white">{orderToEdit?.notes}</p>
            </div>
          </div>

          <div>
            <div className="flex items-center text-left gap-4">
              <p className="w-[100px]">Order Number</p>
              <p className="dark:text-white">{orderToEdit?.order_number}</p>
            </div>

            <div className="flex items-center text-left gap-4">
              <p className="w-[100px]">Supplier</p>
              <p className="dark:text-white">{orderToEdit?.supplier_name}</p>
            </div>

            <div className="flex items-center text-left gap-4">
              <p className="w-[100px]">Date</p>
              <p className="dark:text-white">{orderToEdit?.createdAt}</p>
            </div>

            <div>
              <div className="flex items-center text-left gap-4">
                <p className="w-[100px]">Total</p>
                <p className="dark:text-white">
                  <span>$ </span>
                  {totalPrice.toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        </section>
      )}
    </Modal>
  );
};

export default EditOrderModal;
