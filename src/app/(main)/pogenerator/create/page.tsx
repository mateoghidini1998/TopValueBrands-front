"use client";
import DeleteIcon from "@/components/svgs/DeleteIcon";
import { useTrackedProductContext } from "@/contexts/trackedProducts.context";
import { TrackedProductType } from "@/types/trackedProducts.types";
import IndexPageContainer from "../../page.container";
import { InputOrderAction } from "../components/InputOrderAction";
import { TableComponent } from "../components/TableComponent";
import { Column } from "../interfaces/ITableComponent";

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
  { key: "product_name", name: "Product", width: "300px" },
  { key: "ASIN", name: "ASIN", width: "100px" },
  { key: "supplier_name", name: "Supplier Name", width: "100px" },
  { key: "quantity", name: "Quantity", width: "50px" },
  { key: "unit_price", name: "Unit Price", width: "100px" },
  { key: "total_amount", name: "Total Amount", width: "100px" },
  // { key: "seller_sku", name: "Amazon SKU", width: "100px" },
  // { key: "thirty_days_rank", name: "30 Day Rank", width: "150px" },
  // { key: "ninety_days_rank", name: "90 Day Rank", width: "150px" },
  { key: "units_sold", name: "Units Sold", width: "50px" },
  // { key: "product_velocity", name: "Velocity", width: "150px" },
  // { key: "lowest_fba_price", name: "Lowest FBA Price ", width: "150px" },
  // { key: "fees", name: "Fees", width: "150px" },
  // { key: "product_cost", name: "Product Cost", width: "150px" },
  // { key: "profit", name: "Profit", width: "150px" },
];

export default function CreatePage() {
  const { trackedProducts, trackedProductsAddedToOrder, addTrackedProductToOrder, removeTrackedProductFromOrder } = useTrackedProductContext();

  const handleAddTrackedProduct = (product: TrackedProductType) => {
    addTrackedProductToOrder(product);
  };

  const handleRemoveTrackedProduct = (product: TrackedProductType) => {
    removeTrackedProductFromOrder(product);
  };

  return (
    <IndexPageContainer>
      <TableComponent<TrackedProductType>
        columns={trackedProductsCol}
        data={trackedProducts}
        actions={<InputOrderAction />}
        dispatchAction={(item: any) => handleAddTrackedProduct(item)}
        tableHeigth="300px"
        actionsWidth="60px"
      />
      <TableComponent<TrackedProductType>
        columns={orderProductsCol}
        data={trackedProductsAddedToOrder}
        actions={<DeleteIcon />}
        dispatchAction={(item: any) => handleRemoveTrackedProduct(item)}
        tableHeigth="300px"
        actionsWidth="60px"
      />
    </IndexPageContainer>
  );
}

