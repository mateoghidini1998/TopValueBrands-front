import { data } from "@/app/data";
import DeleteIcon from "@/components/svgs/DeleteIcon";
import IndexPageContainer from "../../page.container";
import { InputOrderAction } from "../components/InputOrderAction";
import { TableComponent } from "../components/TableComponent";
import { Column } from "../interfaces/ITableComponent";
import { TrackedProducts } from "../interfaces/ITrackedProducts";

const products: TrackedProducts[] = data.products;
const orderProducts: TrackedProducts[] = data.orderProducts;

const trackedProductsCol: Column[] = [
  { key: "product", name: "Product", width: "100px" },
  { key: "supplier_name", name: "Supplier Name", width: "100px" },
  { key: "asin", name: "ASIN", width: "100px" },
  { key: "amazon_sku", name: "Amazon SKU", width: "100px" },
  { key: "current_rank", name: "Current Rank", width: "100px" },
  { key: "30_day_rank", name: "30 Day Rank", width: "100px" },
  { key: "90_day_rank", name: "90 Day Rank", width: "100px" },
  { key: "units_sold", name: "Units Sold", width: "100px" },
  { key: "velocity", name: "Velocity", width: "100px" },
];

const orderProductsCol: Column[] = [
  { key: "product", name: "Product", width: "100px" },
  { key: "supplier_name", name: "Supplier Name", width: "100px" },
  { key: "asin", name: "ASIN", width: "100px" },
  { key: "quantity", name: "Quantity", width: "100px" },
  { key: "amazon_sku", name: "Amazon SKU", width: "100px" },
  { key: "current_rank", name: "Current Rank", width: "100px" },
  { key: "30_day_rank", name: "30 Day Rank", width: "100px" },
  { key: "90_day_rank", name: "90 Day Rank", width: "100px" },
  { key: "units_sold", name: "Units Sold", width: "100px" },
  { key: "velocity", name: "Velocity", width: "100px" },
];

export default function CreatePage() {
  return (
    <IndexPageContainer>
      <TableComponent<TrackedProducts>
        columns={trackedProductsCol}
        data={products}
        actions={<InputOrderAction />}
        tableHeigth="300px"
        actionsWidth="60px"
      />
      <TableComponent<TrackedProducts>
        columns={orderProductsCol}
        data={orderProducts}
        actions={<DeleteIcon />}
        tableHeigth="300px"
        actionsWidth="60px"
      />
    </IndexPageContainer>
  );
}
