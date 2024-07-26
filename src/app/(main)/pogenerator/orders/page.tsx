"use client";
import CancelButton from "@/components/svgs/CancelButton";
import ConfirmButton from "@/components/svgs/ConfirmButton";
import DownloadIcon from "@/components/svgs/DownloadIcon";
import { useOrdersContext } from "@/contexts/orders.context";
import useThemeContext from "@/contexts/theme.context";
import { FaEye } from "react-icons/fa";
import IndexPageContainer from "../../page.container";
import EditOrderModal from "../components/EditModalOrder";
import { TableComponent } from "../components/TableComponent";
import { Column } from "../interfaces/ITableComponent";

const columns: Column[] = [
  { key: "supplier_name", name: "Supplier Name", width: "100px" },
  { key: "order_number", name: "Order Number", width: "100px" },
  { key: "createdAt", name: "Date", width: "100px" },
  { key: "total_price", name: "Total", width: "100px" },
  { key: "notes", name: "Notes", width: "150px" },
  { key: "status", name: "Status", width: "150px" },
];

export default function OrderPage() {
  const {
    orders,
    loading,
    error,
    rejectOrder,
    acceptOrder,
    downloadOrder,
    editOrder,
    openEditModal,
  } = useOrdersContext();

  const { theme } = useThemeContext();

  const actionHandlers = {
    add: (data: any) => {
      return new Promise<void>((resolve) => {
        acceptOrder(data.id);
        resolve();
      });
    },
    remove: (data: any) => {
      return new Promise<void>((resolve) => {
        rejectOrder(data.id);
        resolve();
      });
    },
    edit: (data: any) => {
      return new Promise<void>((resolve) => {
        openEditModal(data);
        resolve();
      });
    },
    download: (data: any) => {
      return new Promise<void>((resolve) => {
        downloadOrder(data.id);
        resolve();
      });
    },
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <IndexPageContainer>
      <TableComponent
        columns={columns}
        data={orders || []}
        actions={[
          <div key={"actions"}>
            <FaEye key={"actions"} className="w-5 h-5" />
          </div>,
          <ConfirmButton key={"actions"} />,
          <div
            key={"actions"}
            className="flex items-center border-solid border-[1px] border-light gap-2 justify-between dark:bg-[#393E4F] dark:text-white py-1 px-2 rounded-lg"
          >
            Download PDF
            <DownloadIcon />
          </div>,
          <CancelButton key={"actions"} />,
        ]}
        actionHandlers={{
          edit: actionHandlers.edit,
          add: actionHandlers.add,
          download: actionHandlers.download,
          remove: actionHandlers.remove,
        }}
      />
      <EditOrderModal isDarkMode={theme === "light" ? false : true} />;
    </IndexPageContainer>
  );
}
