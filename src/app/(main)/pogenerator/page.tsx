import IndexPageContainer from "../page.container";
import { TableComponent } from "./components/TableComponent";
import { TrackedProducts } from "./interfaces/ITrackedProducts";
import data from "../../data/index";
import { Column } from "./interfaces/ITableComponent";

const columns: Column[] = [
  { key: 'product', name: 'Product' },
  { key: 'supplier_name', name: 'Supplier Name' },
  { key: 'asin', name: 'ASIN' },
  { key: 'amazon_sku', name: 'Amazon SKU' },
  { key: 'current_rank', name: 'Current Rank' },
  { key: '30_day_rank', name: '30 Day Rank' },
  { key: '90_day_rank', name: '90 Day Rank' },
  { key: 'units_sold', name: 'Units Sold' },
  { key: 'velocity', name: 'Velocity' },
];

/*Here we should call all the tracked products*/
const products: TrackedProducts[] = data;


export default function POGeneratorPage() {

  // const {
  //   products,
  //   handlePreviousPage,
  //   handleNextPage,
  //   currentPage,
  //   totalPages,
  //   setCurrentPage,
  // } = usePOGeneratorContext();

  return (
    <IndexPageContainer>
      {/* <section className="min-h-fit"> */}
        <TableComponent<TrackedProducts> columns={columns} data={products}  />
      {/* </section> */}
    </IndexPageContainer>
  );
}
