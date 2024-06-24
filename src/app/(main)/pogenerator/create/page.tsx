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

const trackedProductsCol: Column[] = [
  { key: "product_name", name: "Product", width: "300px" },
  { key: "ASIN", name: "ASIN", width: "150px" },
  { key: "seller_sku", name: "Amazon SKU", width: "150px" },
  { key: "supplier_name", name: "Supplier Name", width: "150px" },
  { key: "thirty_days_rank", name: "30 Day Rank", width: "150px" },
  { key: "ninety_days_rank", name: "90 Day Rank", width: "150px" },
  { key: "units_sold", name: "Units Sold", width: "150px" },
  { key: "product_velocity", name: "Velocity", width: "150px" },
  { key: "lowest_fba_price", name: "Lowest FBA Price ", width: "150px" },
  { key: "fees", name: "Fees", width: "150px" },
  { key: "product_cost", name: "Product Cost", width: "150px" },
  { key: "profit", name: "Profit", width: "150px" },
];

const orderProductsCol: Column[] = [
  { key: "product_name", name: "Product", width: "19%" },
  { key: "ASIN", name: "ASIN", width: "12%" },
  { key: "supplier_name", name: "Supplier Name", width: "12%" },
  { key: "quantity", name: "Quantity", width: "12%" },
  { key: "unit_price", name: "Unit Price", width: "12%" },
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
  } = useTrackedProductContext();

  const actionHandlers = {
    add: addTrackedProductToOrder,
    remove: removeTrackedProductFromOrder,
    edit: updateTrackedProductInOrder,
  };

  return (
    <IndexPageContainer>
      <TableComponent<TrackedProductType>
        columns={trackedProductsCol}
        data={trackedProducts}
        actions={[<InputOrderAction key={"actions"} />]}
        actionHandlers={{ add: actionHandlers.add }}
        tableHeigth="300px"
        actionsWidth="60px"
      />
      <div className="w-full h-fit space-y-4">
        <TableComponent<ProductInOrder>
          columns={orderProductsCol}
          data={trackedProductsAddedToOrder}
          actions={[<></>, <DeleteIcon key={"actions"} />]}
          actionHandlers={{
            remove: actionHandlers.remove,
            // edit: actionHandlers.edit,
          }}
          tableHeigth="300px"
          actionsWidth="60px"
          tableMaxHeight="300px"
        />
        {trackedProductsAddedToOrder.length > 0 && (
          <OrderSummary orderProducts={trackedProductsAddedToOrder} />
        )}
      </div>
    </IndexPageContainer>
  );
}
