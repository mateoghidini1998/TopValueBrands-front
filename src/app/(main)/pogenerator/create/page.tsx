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
  { key: "product_name", name: "Product", width: "250px" },
  { key: "supplier_name", name: "Supplier Name", width: "150px" },
  { key: "product_velocity", name: "Velocity", width: "60px" },
  { key: "units_sold", name: "U. Sold", width: "60px" },
  { key: "thirty_days_rank", name: "30 Day Rank", width: "90px" },
  { key: "ninety_days_rank", name: "90 Day Rank", width: "90px" },
  { key: "ASIN", name: "ASIN", width: "100px" },
  // supplier_item_number
  { key: "seller_sku", name: "Amazon SKU", width: "120px" },
  { key: "product_cost", name: "Product Cost", width: "80px" },
  { key: "lowest_fba_price", name: "FBA Price ", width: "90px" },
  { key: "FBA_available_inventory", name: "FBA Stock", width: "90px" },
  { key: "reserved_quantity", name: "Reserved Stock", width: "90px" },
  { key: "Inbound_to_FBA", name: "Inbound FBA", width: "90px" },
  { key: "supplier_item_number", name: "Supplier item No", width: "90px" },
  { key: "profit", name: "Profit", width: "100px" },
  { key: "fees", name: "Fees", width: "75px" },
  { key: "roi", name: "ROI", width: "85px" },
  { key: "updatedAt", name: "Last Update", width: "100px" },
];

const orderProductsCol: Column[] = [
  { key: "product_name", name: "Product", width: "19%" },
  { key: "ASIN", name: "ASIN", width: "12%" },
  { key: "supplier_name", name: "Supplier Name", width: "12%" },
  { key: "quantity", name: "Quantity", width: "12%" },
  { key: "unit_price", name: "Product Cost", width: "12%" },
  { key: "total_amount", name: "Total Amount", width: "12%" },
  { key: "units_sold", name: "U. Sold", width: "5%" },
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
          hasOrderFilds={true}
          nextPage={handleNextPage}
          previousPage={handlePreviousPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
          columns={trackedProductsCol}
          data={trackedProducts}
          actions={[<InputOrderAction key={"actions"} />]}
          actionElements={{
            add: <InputOrderAction key={"actions"} />,
            edit: <></>,
            download: <></>,
            remove: <></>,
            restart: <></>,
            none: <></>,
          }}
          actionHandlers={{ add: actionHandlers.add }}
          tableHeigth="600px"
          tableMaxHeight="fit-content"
          actionsWidth="60px"
        />
        {trackedProductsAddedToOrder.length > 0 && (
          <div className="w-full h-fit space-y-4">
            <TableComponent<ProductInOrder>
              totalPages={0}
              columns={orderProductsCol}
              data={trackedProductsAddedToOrder}
              actions={[<DeleteIcon key={"actions"} />]}
              actionHandlers={{
                remove: actionHandlers.remove,
              }}
              actionElements={{
                remove: <DeleteIcon key={"actions"} />,
                edit: <></>,
                download: <></>,
                add: <></>,
                restart: <></>,
                none: <></>,
              }}
              tableHeigth="fit-content"
              tableMaxHeight="fit-content"
              actionsWidth="60px"
            />

            <OrderSummary orderProducts={trackedProductsAddedToOrder} />
          </div>
        )}
      </IndexPageContainer>
    </>
  );
}
