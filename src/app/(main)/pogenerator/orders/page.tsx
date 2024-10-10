// "use client";
// import DotsSVG from "@/components/svgs/DotsSVG";
// import { useOrdersContext } from "@/contexts/orders.context";
// import useThemeContext from "@/contexts/theme.context";
// import { useState } from "react";
// import IndexPageContainer from "../../page.container";
// import EditOrderModal from "../components/EditModalOrder";
// import { TableComponent } from "../components/TableComponent";
// import { Column } from "../interfaces/ITableComponent";

// const columns: Column[] = [
//   { key: "supplier_name", name: "Supplier Name", width: "150px" },
//   { key: "order_number", name: "Order Number", width: "100px" },
//   { key: "createdAt", name: "Date", width: "150px" },
//   { key: "total_price", name: "Total", width: "120px" },
//   { key: "notes", name: "Notes", width: "150px" },
//   { key: "status", name: "Status", width: "110px" },
//   { key: "average_roi", name: "AVG ROI", width: "150px" },
// ];

// export default function OrderPage() {
//   const {
//     orders,
//     loading,
//     error,
//     rejectOrder,
//     acceptOrder,
//     cancelOrder,
//     inTransitOrder,
//     arrivedOrder,
//     closeOrder,
//     waitingForSupplierApprovalOrder,
//     downloadOrder,
//     restartOrder,
//     editOrder,
//     openEditModal,
//     setEditOrderAction,
//     editOrderAction,
//     // getOrderById,
//   } = useOrdersContext();

//   const { theme } = useThemeContext();
//   const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

//   // Estado para controlar el ID del elemento seleccionado

//   const actionHandlers = {
//     add: (data: any) => {
//       return new Promise<void>((resolve) => {
//         console.log(data);
//         acceptOrder(data.id);
//         resolve();
//       });
//     },
//     cancel: (data: any) => {
//       return new Promise<void>((resolve) => {
//         cancelOrder(data.id);
//         resolve();
//       });
//     },
//     inTransit: (data: any) => {
//       return new Promise<void>((resolve) => {
//         inTransitOrder(data.id);
//         resolve();
//       });
//     },
//     arrived: (data: any) => {
//       return new Promise<void>((resolve) => {
//         arrivedOrder(data.id);
//         resolve();
//       });
//     },
//     close: (data: any) => {
//       return new Promise<void>((resolve) => {
//         closeOrder(data.id);
//         resolve();
//       });
//     },
//     waitingForSupplierApproval: (data: any) => {
//       return new Promise<void>((resolve) => {
//         waitingForSupplierApprovalOrder(data.id);
//         resolve();
//       });
//     },
//     remove: (data: any) => {
//       return new Promise<void>((resolve) => {
//         rejectOrder(data.id);
//         resolve();
//       });
//     },
//     edit: (data: any) => {
//       return new Promise<void>((resolve) => {
//         console.log(data);
//         openEditModal(data);
//         resolve();
//       });
//     },
//     download: (data: any) => {
//       return new Promise<void>((resolve) => {
//         downloadOrder(data.id);
//         resolve();
//       });
//     },
//     restart: (data: any) => {
//       return new Promise<void>((resolve) => {
//         restartOrder(data.id);
//         resolve();
//       });
//     },
//     none: (data: any) => {
//       if (selectedOrderId === data) {
//         // Si se hace clic en el mismo botón, cerrar
//         setSelectedOrderId(null);
//         setEditOrderAction(null);
//       } else {
//         // Si es un botón diferente, abrir y establecer como seleccionado
//         setSelectedOrderId(data);
//         setEditOrderAction(data);
//       }
//     },
//   };

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error: {error.message}</p>;

//   return (
//     <IndexPageContainer>
//       <TableComponent
//         totalPages={Math.ceil(orders?.length / 50)}
//         columns={columns}
//         data={orders || []}
//         tableHeigth="600px"
//         actionsWidth="300px"
//         actions={[
//           <p key="edit">Edit</p>,
//           <p key="remove">Delete</p>,
//           <p key="download">Download</p>,
//           <p key="restart">Reset</p>,
//           <p key="none">None</p>,
//         ]}
//         actionHandlers={{
//           edit: actionHandlers.edit,
//           add: actionHandlers.add,
//           restart: actionHandlers.restart,
//           download: actionHandlers.download,
//           remove: actionHandlers.remove,
//           none: actionHandlers.none,
//           cancel: actionHandlers.cancel,
//           inTransit: actionHandlers.inTransit,
//           arrived: actionHandlers.arrived,
//           close: actionHandlers.close,
//           waitingForSupplierApproval: actionHandlers.waitingForSupplierApproval,
//         }}
//         actionElements={{
//           edit: <></>,
//           none: (
//             <div className="relative">
//               <button>
//                 <DotsSVG stroke={theme === "light" ? "#000" : "#FFF"} />
//               </button>
//             </div>
//           ),

//           add: <></>,
//           remove: <></>,
//           restart: <></>,
//           download: <></>,
//         }}
//       />
//       <EditOrderModal isDarkMode={theme === "light" ? false : true} />
//     </IndexPageContainer>
//   );
// }

"use client";
import { useOrdersContext } from "@/contexts/orders.context";
import IndexPageContainer from "../../page.container";
import { columns } from "./columns";
import { DataTable } from "./data-table";

export default function OrderPage() {
  const { orders } = useOrdersContext();

  return (
    <IndexPageContainer>
      <div className="w-full px-[1.3rem] py-10">
        <DataTable columns={columns} data={orders} />
      </div>
    </IndexPageContainer>
  );
}
