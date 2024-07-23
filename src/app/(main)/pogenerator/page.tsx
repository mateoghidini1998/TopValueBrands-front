"use client";
import { useTrackedProductContext } from "@/contexts/trackedProducts.context";
// import { data } from "../../data/index";
import IndexPageContainer from "../page.container";
import { TableComponent } from "./components/TableComponent";
import { Column } from "./interfaces/ITableComponent";
import { TrackedProductType } from "@/types/trackedProducts.types";

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
  { key: "updatedAt", name: "Last Update", width: "150px" },
];

export default function POGeneratorPage() {
  const { trackedProducts } = useTrackedProductContext();

  // console.log(trackedProducts);

  return (
    <IndexPageContainer>
      <TableComponent<TrackedProductType>
        columns={columns}
        data={trackedProducts}
      />
    </IndexPageContainer>
  );
}
