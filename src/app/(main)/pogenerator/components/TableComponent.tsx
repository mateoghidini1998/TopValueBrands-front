"use client";
import { ProductNameTableData } from "@/components/inventory/ProductNameTableData";
import { OrderTags } from "@/components/ui/OrderTags";
import {
  ProductInOrder,
  useTrackedProductContext,
} from "@/contexts/trackedProducts.context";
import { ChangeEvent, useState } from "react";
import { TableComponentProps } from "../interfaces/ITableComponent";
import Pagination from "@/components/inventory/Pagination";
import { OrderByComponent } from "./OrderByComponent";
import { ActionButtons } from "./ActionButtons";
import EditOrderOptionActions from "./EditOrderOptionActions";
import { useOrdersContext } from "@/contexts/orders.context";
import classNames from "classnames";
import Image from "next/image";

type ActionType = "add" | "remove" | "edit" | "download" | "restart" | "none";

type ActionHandler<T> = (arg1: T, arg2?: any) => Promise<void>;

export type Actions<T> = {
  add?: ActionHandler<T>;
  remove?: ActionHandler<T>;
  edit?: ActionHandler<T>;
  download?: ActionHandler<T>;
  restart?: ActionHandler<T>;
  none?: (order: any) => any;
};

type ActionElementMap = {
  [key in ActionType]: any;
};

export const TableComponent = <T,>({
  hasOrderFilds,
  nextPage,
  previousPage,
  currentPage,
  setCurrentPage,
  totalPages,
  columns,
  data,
  actions,
  actionHandlers,
  actionsWidth = "600px",
  tableHeigth = "100%",
  tableMaxHeight = "100%",
  actionElements,
}: TableComponentProps<T> & {
  actionHandlers?: Actions<T>;
  actionElements?: ActionElementMap;
}) => {
  const TABLE_COLUMNS = columns;
  const TABLE_ROWS = data;

  const ORDER_COLS = [
    "current_rank",
    "thirty_days_rank",
    "ninety_days_rank",
    "units_sold",
    "product_velocity",
    "lowest_fba_price",
    "fees",
    "profit",
    "updatedAt",
  ];

  // check if actions exists on the TABLE_COLUMNS
  if (actions && !TABLE_COLUMNS.find((column) => column.key === "actions")) {
    TABLE_COLUMNS.push({
      key: "actions",
      name: "Actions",
      width: actionsWidth,
    });
  }
  const { updateTrackedProductInOrder } = useTrackedProductContext();
  const {
    editOrderAction,
    setEditOrderAction,
    acceptOrder,
    rejectOrder,
    restartOrder,
  } = useOrdersContext();
  const [showStatusDropdown, setShowStatusDropdown] = useState<string>("");

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement>,
    row: ProductInOrder,
    key: string
  ) => {
    const newValue = parseFloat(event.target.value);
    const updatedRow = {
      ...row,
      [key]: newValue,
    };
    updatedRow.total_amount = updatedRow.quantity * updatedRow.unit_price;
    updateTrackedProductInOrder(updatedRow);
  };

  const handleApproveOrderStatus = (rowId: number) => {
    acceptOrder(rowId);
    setShowStatusDropdown("");
    return;
  };

  const handleRejectOrderStatus = (rowId: number) => {
    rejectOrder(rowId);
    setShowStatusDropdown("");
  };

  const handlePendingOrderStatus = (rowId: number) => {
    restartOrder(rowId);
    setShowStatusDropdown("");
  };

  return (
    <div className="scroll-container mt-8">
      <div
        className={`table-wrapper`}
        style={{ height: tableHeigth, maxHeight: tableMaxHeight }}
      >
        <table
          className={`${tableHeigth} max-h-[${tableMaxHeight}] w-full bg-white dark:bg-dark transition-colors duration-[0.6s] ease-in-out`}
        >
          <thead className="pogenerator_table_header right-0 bg-white text-light dark:bg-dark-3 dark:text-white sticky top-0">
            <tr className="m-0 py-6 stroke-1 stroke-dark-3 h-[60px] bg-[#F8FAFC] text-black dark:text-white dark:bg-dark-2 transition-colors duration-[0.6s] ease-in-out flex items-center justify-between">
              {TABLE_COLUMNS.map((column) => (
                <th
                  key={column.key}
                  className={`${
                    hasOrderFilds
                      ? "flex items-center justify-center gap-1"
                      : ""
                  } py-2 px-4 text-xs font-medium whitespace-nowrap ${
                    column.key === "actions" ? "text-right" : "text-center"
                  }`}
                  style={{ width: column.width }}
                >
                  {hasOrderFilds && ORDER_COLS.includes(column.key) && (
                    <OrderByComponent orderBy={column.key} />
                  )}
                  {column.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {TABLE_ROWS.map((row, rowIndex) => {
              // console.log(row);

              return (
                <tr
                  key={rowIndex}
                  className={`dark:text-white h-[60px] dark:bg-dark text-xs font-medium flex items-center justify-between border-b  dark:border-[#393E4F] text-light `}
                >
                  {columns.map((column) => {
                    const cellValue = (row as any)[column.key];
                    return column.key === "actions" ? (
                      <td
                        width={column.width}
                        key={column.key}
                        className="py-2 px-4 text-right relative"
                      >
                        {actions && actionHandlers && actionElements && (
                          <ActionButtons
                            actionHandlers={actionHandlers}
                            actions={[
                              actionElements.edit!,
                              actionElements.add!,
                              actionElements.download!,
                              actionElements.remove!,
                              actionElements.restart!,
                              actionElements.none!,
                            ]}
                            row={row}
                          />
                        )}

                        {editOrderAction?.id == row.id &&
                          actionHandlers &&
                          actionElements && (
                            <EditOrderOptionActions
                              setEditOrderAction={setEditOrderAction}
                              actionElements={actionElements}
                              actionHandlers={actionHandlers}
                              row={row}
                            />
                          )}
                      </td>
                    ) : column.key === "product_name" ? (
                      <ProductNameTableData
                        key={column.key}
                        product={row}
                        width={column.width}
                      />
                    ) : column.key === "quantity" ||
                      column.key === "unit_price" ? (
                      <td
                        key={column.key}
                        className="py-2 px-4 text-center flex items-center justify-center gap-4"
                        style={{ width: column.width }}
                      >
                        {column.key === "unit_price" && "$"}
                        <input
                          type="number"
                          value={cellValue}
                          onChange={(event) =>
                            handleInputChange(event, row, column.key)
                          }
                          className="w-full bg-transparent border-b border-gray-300 focus:outline-none focus:border-blue-500"
                        />
                      </td>
                    ) : column.key === "total_amount" ? (
                      <td
                        key={column.key}
                        className="py-2 px-4 text-center"
                        style={{ width: column.width }}
                      >
                        {`$ ${(row.quantity * row.unit_price).toLocaleString(
                          "en-US",
                          {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          }
                        )}`}
                      </td>
                    ) : column.key === "status" ? (
                      <td
                        onClick={() => {
                          if (showStatusDropdown == row.id) {
                            setShowStatusDropdown("");
                          } else if (
                            showStatusDropdown != row.id ||
                            showStatusDropdown == ""
                          ) {
                            setShowStatusDropdown(row.id);
                          }
                        }}
                        key={column.key}
                        className="py-2 px-4 text-center relative"
                        style={{ width: column.width }}
                      >
                        <div className="rounded-full flex items-center justify-between">
                          <OrderTags status={cellValue} />
                        </div>
                        {showStatusDropdown == row.id && (
                          <div className=" py-2 pl-4 pr-2 flex flex-col absolute top-[50px] z-20 items-start justify-between gap-3 bg-white dark:bg-dark-2 rounded-md border-solid border-[1px] border-[#d0d7df] dark:border-dark-3">
                            <div
                              className="flex justify-between items-center w-[120px]"
                              onClick={() => handleApproveOrderStatus(row.id)}
                            >
                              <OrderTags status={"GOOD TO GO"} />
                              {row.status.toUpperCase() === "GOOD TO GO" ? (
                                <span className="">
                                  <Image
                                    src={"/Done_round.svg"}
                                    alt="check"
                                    width={20}
                                    height={20}
                                    className="w-[20px] h-[20px]"
                                  />
                                </span>
                              ) : (
                                <span className=""></span>
                              )}
                            </div>
                            <div
                              className="w-[120px] flex justify-between items-center"
                              onClick={() => handlePendingOrderStatus(row.id)}
                            >
                              <OrderTags status={"PENDING"} />
                              {row.status.toUpperCase() === "PENDING" ? (
                                <span className="">
                                  <Image
                                    src={"/Done_round.svg"}
                                    alt="check"
                                    width={20}
                                    height={20}
                                    className="w-[20px] h-[20px]"
                                  />
                                </span>
                              ) : (
                                <span className=""></span>
                              )}
                            </div>
                            <div
                              className="w-[120px] flex justify-between items-center"
                              onClick={() => handleRejectOrderStatus(row.id)}
                            >
                              <OrderTags status={"REJECTED"} />
                              {row.status.toUpperCase() === "REJECTED" ? (
                                <span className="">
                                  <Image
                                    src={"/Done_round.svg"}
                                    alt="check"
                                    width={20}
                                    height={20}
                                    className="w-[20px] h-[20px]"
                                  />
                                </span>
                              ) : (
                                <span className=""></span>
                              )}
                            </div>
                            <div
                              className="w-[120px] flex justify-between items-center"
                              onClick={() => console.log(row.id)}
                            >
                              <OrderTags status={"IN TRANSIT"} />
                              {row.status.toUpperCase() === "IN TRANSIT" ? (
                                <span className="">
                                  <Image
                                    src={"/Done_round.svg"}
                                    alt="check"
                                    width={20}
                                    height={20}
                                    className="w-[20px] h-[20px]"
                                  />
                                </span>
                              ) : (
                                <span className=""></span>
                              )}
                            </div>
                            <div
                              className="w-[120px] flex justify-between items-center"
                              onClick={() => console.log(row.id)}
                            >
                              <OrderTags status={"ARRIVED"} />
                              {row.status.toUpperCase() === "ARRIVED" ? (
                                <span className="">
                                  <Image
                                    src={"/Done_round.svg"}
                                    alt="check"
                                    width={20}
                                    height={20}
                                    className="w-[20px] h-[20px]"
                                  />
                                </span>
                              ) : (
                                <span className=""></span>
                              )}
                            </div>
                            <div
                              className="w-[120px] flex justify-between items-center"
                              onClick={() => console.log(row.id)}
                            >
                              <OrderTags
                                status={"WAITING FOR SUPPLIER APPROVAL"}
                              />
                              {row.status.toUpperCase() ===
                              "WAITING FOR SUPPLIER APPROVAL" ? (
                                <span className="">
                                  <Image
                                    src={"/Done_round.svg"}
                                    alt="check"
                                    width={20}
                                    height={20}
                                    className="w-[20px] h-[20px]"
                                  />
                                </span>
                              ) : (
                                <span className=""></span>
                              )}
                            </div>
                            <div
                              className="w-[120px] flex justify-between items-center"
                              onClick={() => console.log(row.id)}
                            >
                              <OrderTags status={"CLOSED"} />
                              {row.status.toUpperCase() === "CLOSED" ? (
                                <span className="">
                                  <Image
                                    src={"/Done_round.svg"}
                                    alt="check"
                                    width={20}
                                    height={20}
                                    className="w-[20px] h-[20px]"
                                  />
                                </span>
                              ) : (
                                <span className=""></span>
                              )}
                            </div>
                            <div
                              className="w-[120px] flex justify-between items-center"
                              onClick={() => console.log(row.id)}
                            >
                              <OrderTags status={"CANCELLED"} />
                              {row.status.toUpperCase() === "CANCELLED" ? (
                                <span className="">
                                  <Image
                                    src={"/Done_round.svg"}
                                    alt="check"
                                    width={20}
                                    height={20}
                                    className="w-[20px] h-[20px]"
                                  />
                                </span>
                              ) : (
                                <span className=""></span>
                              )}
                            </div>
                          </div>
                        )}
                      </td>
                    ) : column.key === "notes" ? (
                      <td
                        onClick={() => {
                          alert(cellValue);
                        }}
                        key={column.key}
                        className="py-2 px-4 text-center text-nowrap overflow-hidden cursor-pointer"
                        style={{ width: column.width }}
                      >
                        {cellValue}
                      </td>
                    ) : column.key === "average_roi" ? (
                      <td
                        key={column.key}
                        className="py-2 px-4 text-center text-nowrap overflow-hidden cursor-pointer"
                        style={{ width: column.width }}
                      >
                        <span
                          className={`w-[65px] py-2 rounded-sm px-4 text-center ${
                            cellValue > 20
                              ? "bg-[#00952A] bg-opacity-10 font-bold  text-[#00952A]"
                              : "bg-[#ef4444] bg-opacity-10 font-bold text-[#ef4444]"
                          }`}
                        >
                          {Number(cellValue).toFixed(2) + " %"}
                        </span>
                      </td>
                    ) : column.key === "ninety_days_rank" ||
                      column.key === "thirty_days_rank" ? (
                      <td
                        key={column.key}
                        className="py-2 px-4 text-center"
                        style={{ width: column.width }}
                      >
                        {typeof cellValue === "number"
                          ? cellValue.toLocaleString()
                          : cellValue}
                      </td>
                    ) : column.key === "lowest_fba_price" ||
                      column.key === "fees" ||
                      column.key === "product_cost" ||
                      column.key === "unit_price" ||
                      column.key === "total_price" ? (
                      <td
                        key={column.key}
                        className="py-2 px-4 text-center"
                        style={{ width: column.width }}
                      >
                        {column.key === "product_cost" ||
                        column.key === "total_price"
                          ? `$ ${Number(cellValue).toLocaleString("en-US", {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}`
                          : `$ ${Number(cellValue).toLocaleString("en-US")}`}
                      </td>
                    ) : column.key === "profit" ? (
                      <td
                        key={column.key}
                        className="py-2 px-4 text-center flex items-center justify-center"
                        style={{ width: column.width }}
                      >
                        <div
                          className={`w-[65px] py-2 rounded-sm ${
                            cellValue > 2
                              ? " bg-[#00952A] bg-opacity-10 font-bold  text-[#00952A]"
                              : cellValue < 2 && cellValue > 0
                              ? "bg-[#C26900] bg-opacity-10 font-bold text-[#C26900] "
                              : "bg-[#ef4444] bg-opacity-10 font-bold text-[#ef4444]"
                          }
                          
                        }`}
                        >
                          {`$ ${Number(cellValue).toLocaleString("en-US")}`}
                        </div>
                      </td>
                    ) : column.key === "product_velocity" ? (
                      <td
                        key={column.key}
                        className="py-2 px-4 text-center"
                        style={{ width: column.width }}
                      >
                        {`${cellValue.toFixed(2)}`}
                      </td>
                    ) : column.key === "updatedAt" ||
                      column.key === "createdAt" ? (
                      <td
                        key={column.key}
                        className="py-2 px-4 text-center"
                        style={{ width: column.width }}
                      >
                        {`${new Date(cellValue)
                          .toLocaleString("en-US", {
                            month: "2-digit",
                            day: "2-digit",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: false,
                          })
                          .replace(",", "")}`}
                      </td>
                    ) : column.key === "roi" ? (
                      <td
                        key={column.key}
                        className={`py2 px-4 text-center w-[65px] py-2 rounded-sm ${
                          row.product_cost !== 0 &&
                          Number(
                            ((row.profit / row.product_cost) * 100).toFixed(2)
                          ) >= 20
                            ? " bg-[#00952A] bg-opacity-10 font-bold  text-[#00952A]"
                            : Number(
                                ((row.profit / row.product_cost) * 100).toFixed(
                                  2
                                )
                              ) < 20 &&
                              Number(
                                ((row.profit / row.product_cost) * 100).toFixed(
                                  2
                                )
                              ) > 19
                            ? "bg-[#C26900] bg-opacity-10 font-bold text-[#C26900] "
                            : "bg-[#ef4444] bg-opacity-10 font-bold text-[#ef4444]"
                        }
                          
                        }`}
                        style={{ width: column.width }}
                      >
                        {row.product_cost !== 0
                          ? `${((row.profit / row.product_cost) * 100).toFixed(
                              2
                            )} %`
                          : "N/A"}
                      </td>
                    ) : (
                      <td
                        key={column.key}
                        className="py-2 px-4 text-center"
                        style={{ width: column.width }}
                      >
                        {cellValue}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {totalPages > 0 && (
        <Pagination
          currentPage={currentPage || 0}
          handleNextPage={nextPage || (() => {})}
          setCurrentPage={setCurrentPage || (() => {})}
          handlePreviousPage={previousPage || (() => {})}
          totalPages={totalPages}
        />
      )}
    </div>
  );
};
