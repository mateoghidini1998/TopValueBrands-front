import { data } from "../../../data/index";
import IndexPageContainer from "../../page.container";
import { OrderActions } from "../components/OrderActions";
import { TableComponent } from "../components/TableComponent";
import { OrdersComponent } from "../interfaces/IOrdersComponent";
import { Column } from "../interfaces/ITableComponent";

const columns: Column[] = [
  { key: "supplier_name", name: "Supplier Name", width:'100px'},
  { key: "order_number", name: "Order Number", width:'100px' },
  { key: "date", name: "Date", width:'100px' },
  { key: "total", name: "Total", width: '100px' },
];
const orders: OrdersComponent[] = data.orders;

const handleAction = () => {
  console.log('hola');
}

export default function OrderPage() {
  return (
    <IndexPageContainer>
      <TableComponent<OrdersComponent> columns={columns} data={orders} actions={<OrderActions />}/>
    </IndexPageContainer>
  );
}
