"use client";
import CancelButton from "@/components/svgs/CancelButton";
import ConfirmButton from "@/components/svgs/ConfirmButton";
import DownloadIcon from "@/components/svgs/DownloadIcon";
import { useOrdersContext } from "@/contexts/orders.context";
import useThemeContext from "@/contexts/theme.context";
import { FaDownload, FaEdit, FaEye } from "react-icons/fa";
import IndexPageContainer from "../../page.container";
import EditOrderModal from "../components/EditModalOrder";
import { TableComponent } from "../components/TableComponent";
import { Column } from "../interfaces/ITableComponent";
import { GrStatusGood } from "react-icons/gr";
import { VscDebugRestart } from "react-icons/vsc";
import { MdDeleteForever } from "react-icons/md";

const columns: Column[] = [
  { key: "supplier_name", name: "Supplier Name", width: "150px" },
  { key: "order_number", name: "Order Number", width: "100px" },
  { key: "createdAt", name: "Date", width: "150px" },
  { key: "total_price", name: "Total", width: "120px" },
  { key: "notes", name: "Notes", width: "150px" },
  { key: "status", name: "Status", width: "150px" },
  { key: "average_roi", name: "AVG ROI", width: "150px" },
];

export default function OrderPage() {
  const {
    orders,
    loading,
    error,
    rejectOrder,
    acceptOrder,
    downloadOrder,
    restartOrder,
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

    restart: (data: any) => {
      return new Promise<void>((resolve) => {
        restartOrder(data.id);
        resolve();
      });
    },
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <IndexPageContainer>
      <TableComponent
        totalPages={Math.ceil(orders?.length / 50)}
        columns={columns}
        data={orders || []}
        tableHeigth="600px"
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
          restart: actionHandlers.restart,
          download: actionHandlers.download,
          remove: actionHandlers.remove,
          none: () => {},
        }}
        actionElements={{
          edit: (
            <div className="relative group">
              <FaEdit className="w-[.9rem] h-[.9rem]" />
              <span className="absolute z-30 left-[-10px] top-full mt-3 w-max p-1 text-xs bg-gray-700 text-white rounded opacity-0 group-hover:opacity-100 transition-opacity">
                Edit
              </span>
            </div>
          ),
          add: (
            <div className="relative group">
              <GrStatusGood className="w-[.9rem] h-[.9rem]" />
              <span className="absolute z-30 left-[-10px] top-full mt-3 w-max p-1 text-xs bg-gray-700 text-white rounded opacity-0 group-hover:opacity-100 transition-opacity">
                Approve
              </span>
            </div>
          ),
          restart: (
            <div className="relative group">
              <VscDebugRestart className="w-[.9rem] h-[.9rem]" />
              <span className="absolute z-30 left-[-10px] top-full mt-3 w-max p-1 text-xs bg-gray-700 text-white rounded opacity-0 group-hover:opacity-100 transition-opacity">
                Pending
              </span>
            </div>
          ),
          download: (
            <div className="relative group">
              <FaDownload className="w-[.9rem] h-[.9rem]" />
              <span className="absolute z-30 left-[-10px] top-full mt-3 w-max p-1 text-xs bg-gray-700 text-white rounded opacity-0 group-hover:opacity-100 transition-opacity">
                Download
              </span>
            </div>
            // <div className="flex items-center gap-2">
            //   Download PDF
            // </div>
          ),
          remove: (
            <div className="relative group">
              <MdDeleteForever className="w-[.9rem] h-[.9rem]" />
              <span className="absolute z-30 left-[-10px] top-full mt-3 w-max p-1 text-xs bg-gray-700 text-white rounded opacity-0 group-hover:opacity-100 transition-opacity">
                Reject
              </span>
            </div>
          ),
          none: <></>,
        }}
      />
      <EditOrderModal isDarkMode={theme === "light" ? false : true} />;
    </IndexPageContainer>
  );
}
