import { data } from "../../../data/index";
import IndexPageContainer from "../../page.container";
import { TableComponent } from "../components/TableComponent";
import { OrdersComponent } from "../interfaces/IOrdersComponent";
import { Column } from "../interfaces/ITableComponent";

const columns: Column[] = [
  { key: "supplier_name", name: "Supplier Name", width:'10%'},
  { key: "order_number", name: "Order Number", width:'10%' },
  { key: "date", name: "Date", width:'10%' },
  { key: "total", name: "Total", width: '10%' },
  { key: "actions", name: "", width: '60%' },
];
const orders: OrdersComponent[] = data.orders;

export default function OrderPage() {
  return (
    <IndexPageContainer>
      <TableComponent<OrdersComponent> columns={columns} data={orders} />
    </IndexPageContainer>
  );
}
