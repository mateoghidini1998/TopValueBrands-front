import IndexPageContainer from "../page.container";
import { TableComponent } from "./components/TableComponent";
import { TrackedProducts } from "./interfaces/ITrackedProducts";
import { data } from "../../data/index";
import { Column } from "./interfaces/ITableComponent";

const columns: Column[] = [
  { key: "product", name: "Product", width:"150px" },
  { key: "supplier_name", name: "Supplier Name", width:"150px" },
  { key: "asin", name: "ASIN", width:"150px" },
  { key: "amazon_sku", name: "Amazon SKU", width:"150px" },
  { key: "current_rank", name: "Current Rank", width:"150px" },
  { key: "30_day_rank", name: "30 Day Rank", width:"150px" },
  { key: "90_day_rank", name: "90 Day Rank", width:"150px" },
  { key: "units_sold", name: "Units Sold", width:"150px" },
  { key: "velocity", name: "Velocity", width:"150px" },
];

/*Here we should call all the tracked products*/
const products: TrackedProducts[] = data.products;

export default function POGeneratorPage() {
  return (
    <IndexPageContainer>
      <TableComponent<TrackedProducts> columns={columns} data={products} />
    </IndexPageContainer>
  );
}
