"use client";
import DeleteIcon from "@/components/svgs/DeleteIcon";
import {
  ProductInOrder,
  useTrackedProductContext,
} from "@/contexts/trackedProducts.context";
import { TrackedProductType } from "@/types/trackedProducts.types";
import IndexPageContainer from "../../page.container";
import { InputOrderAction } from "../components/InputOrderAction";
import { TableComponent } from "../components/TableComponent";
import { Column } from "../interfaces/ITableComponent";
import { OrderSummary } from "../components/OrderSummary";
import CustomAlert, {
  CustomAlertOptions,
} from "@/components/alerts/CustomAlerts";
import useThemeContext from "@/contexts/theme.context";
import { useEffect, useState } from "react";

const trackedProductsCol: Column[] = [
  { key: "product_name", name: "Product", width: "300px" },
  { key: "supplier_name", name: "Supplier Name", width: "150px" },
  { key: "product_velocity", name: "Velocity", width: "75px" },
  { key: "units_sold", name: "Units Sold", width: "75px" },
  { key: "thirty_days_rank", name: "30 Day Rank", width: "75px" },
  { key: "ninety_days_rank", name: "90 Day Rank", width: "75px" },
  { key: "ASIN", name: "ASIN", width: "130px" },
  // supplier_item_number
  { key: "seller_sku", name: "Amazon SKU", width: "130px" },
  { key: "product_cost", name: "Product Cost", width: "75px" },
  { key: "lowest_fba_price", name: "FBA Price ", width: "75px" },
  { key: "profit", name: "Profit", width: "75px" },
  { key: "fees", name: "Fees", width: "75px" },
  // roi
  // warehouse stock
  // fba stock
  // inbound stock
  { key: "updatedAt", name: "Last Update", width: "100px" },
];

const orderProductsCol: Column[] = [
  { key: "product_name", name: "Product", width: "19%" },
  { key: "ASIN", name: "ASIN", width: "12%" },
  { key: "supplier_name", name: "Supplier Name", width: "12%" },
  { key: "quantity", name: "Quantity", width: "12%" },
  { key: "unit_price", name: "Product Cost", width: "12%" },
  { key: "total_amount", name: "Total Amount", width: "12%" },
  { key: "units_sold", name: "Units Sold", width: "5%" },
];

export default function Page() {
  const {
    trackedProducts,
    trackedProductsAddedToOrder,
    addTrackedProductToOrder,
    removeTrackedProductFromOrder,
    updateTrackedProductInOrder,
    handleNextPage,
    handlePreviousPage,
    totalPages,
    currentPage,
    setCurrentPage,
  } = useTrackedProductContext();

  const { theme } = useThemeContext();

  const [customAlertProperties, setCustomAlertProperties] = useState({
    show: false,
    type: CustomAlertOptions.ERROR,
    message: "",
    description: "",
    visible: false,
  });

  const [showAlert, setShowAlert] = useState(false);

  const showCustomAlert = (
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
    // console.log(showAlert);
    if (showAlert) {
      setTimeout(() => {
        setShowAlert(false);
        setCustomAlertProperties({ ...customAlertProperties, show: false });
      }, 3000);
    }
  }, [customAlertProperties, showAlert]);

  const actionHandlers = {
    async add(data: any): Promise<void> {
      let newProd = addTrackedProductToOrder(data);

      if (typeof newProd === "string") {
        console.log(newProd);
        setShowAlert(true);
        showCustomAlert(
          CustomAlertOptions.ERROR,
          "Error adding the product",
          newProd,
          true
        );
      } else {
        setShowAlert(false);
      }
    },
    async remove(data: any): Promise<void> {
      removeTrackedProductFromOrder(data);
    },
    async edit(data: any): Promise<void> {
      updateTrackedProductInOrder(data);
    },
  };

  return (
    <>
      {showAlert && (
        <CustomAlert
          theme={theme}
          message={customAlertProperties.message}
          description={customAlertProperties.description}
          type={customAlertProperties.type}
          visible={customAlertProperties.visible}
          closable={true}
          showIcon={true}
        />
      )}
      <IndexPageContainer>
        <TableComponent<TrackedProductType>
          nextPage={handleNextPage}
          previousPage={handlePreviousPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
          columns={trackedProductsCol}
          data={trackedProducts}
          actions={[<></>, <InputOrderAction key={"actions"} />, <></>, <></>]}
          actionHandlers={{ add: actionHandlers.add }}
          tableHeigth="300px"
          actionsWidth="60px"
        />
        <div className="w-full h-fit space-y-4">
          <TableComponent<ProductInOrder>
            totalPages={0}
            columns={orderProductsCol}
            data={trackedProductsAddedToOrder}
            actions={[<></>, <></>, <></>, <DeleteIcon key={"actions"} />]}
            actionHandlers={{
              remove: actionHandlers.remove,
              // edit: actionHandlers.edit,
            }}
            tableHeigth="300px"
            actionsWidth="60px"
            tableMaxHeight="300px"
          />

          <OrderSummary orderProducts={trackedProductsAddedToOrder} />
        </div>
      </IndexPageContainer>
    </>
  );
}
