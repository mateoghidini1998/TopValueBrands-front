"use client";
import { ProductNameTableData } from "@/components/inventory/ProductNameTableData";
import { OrderTags } from "@/components/ui/OrderTags";
import {
  ProductInOrder,
  useTrackedProductContext,
} from "@/contexts/trackedProducts.context";
import { ChangeEvent } from "react";
import { TableComponentProps } from "../interfaces/ITableComponent";
import Pagination from "@/components/inventory/Pagination";
import { OrderByComponent } from "./OrderByComponent";

type ActionType = "add" | "remove" | "edit" | "download";

type ActionHandler<T> = (arg1: T, arg2?: any) => Promise<void>;

type Actions<T> = {
  add?: ActionHandler<T>;
  remove?: ActionHandler<T>;
  edit?: ActionHandler<T>;
  download?: ActionHandler<T>;
};

export const TableComponent = <T,>({
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
}: TableComponentProps<T> & { actionHandlers?: Actions<T> }) => {
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

  return (
    <div className="scroll-container mt-8">
      <div
        className={`table-wrapper`}
        style={{ height: tableHeigth, maxHeight: tableMaxHeight }}
      >
        <table
          className={`${tableHeigth} max-h-[${tableMaxHeight}] w-full bg-white dark:bg-dark transition-colors duration-[0.6s] ease-in-out`}
        >
          <thead className="pogenerator_table_header right-0 bg-white text-light dark:bg-dark-3 dark:text-white">
            <tr className="m-0 py-6 stroke-1 stroke-dark-3 h-[60px] bg-[#F8FAFC] text-black dark:text-white dark:bg-dark-2 transition-colors duration-[0.6s] ease-in-out flex items-center justify-between">
              {TABLE_COLUMNS.map((column) => (
                <th
                  key={column.key}
                  className={`flex items-center gap-2 py-2 px-4 text-xs font-medium whitespace-nowrap ${column.key === "actions" ? "text-right" : "text-center"}`}
                  style={{ width: column.width }}
                >
                  {ORDER_COLS.includes(column.key) && (
                    <OrderByComponent orderBy={column.key} />
                  )}
                  {column.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {TABLE_ROWS.map((row, rowIndex) => {
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
                        className={`py-2 px-4 text-right`}
                      >
                        {actions && actionHandlers && (
                          <div className="flex items-center justify-end gap-2">
                            {actionHandlers.edit && (
                              <button
                                className={``}
                                onClick={() => actionHandlers.edit!(row as any)}
                              >
                                {actions[0]}
                              </button>
                            )}
                            {actionHandlers.add && (
                              <button
                                onClick={() => actionHandlers.add!(row as any)}
                              >
                                {actions[1]}
                              </button>
                            )}
                            {actionHandlers.download && (
                              <button
                                className={``}
                                onClick={() =>
                                  actionHandlers.download!(row as any)
                                }
                              >
                                {actions[2]}
                              </button>
                            )}
                            {actionHandlers.remove && (
                              <button
                                onClick={() =>
                                  actionHandlers.remove!(row as any)
                                }
                              >
                                {actions[3]}
                              </button>
                            )}
                          </div>
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
                        {`$ ${row.quantity * row.unit_price}`}
                      </td>
                    ) : column.key === "status" ? (
                      <td
                        key={column.key}
                        className="py-2 px-4 text-center"
                        style={{ width: column.width }}
                      >
                        <div className="rounded-full flex items-center justify-between">
                          <OrderTags status={cellValue} />
                        </div>
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
                      column.key === "total_price" ? (
                      <td
                        key={column.key}
                        className="py-2 px-4 text-center"
                        style={{ width: column.width }}
                      >
                        {`$ ${Number(cellValue).toLocaleString("en-US")}`}
                      </td>
                    ) : column.key === "profit" ? (
                      <td
                        key={column.key}
                        className="py-2 px-4 text-center flex items-center justify-center"
                        style={{ width: column.width }}
                      >
                        <div
                          className={`w-[65px] py-2 rounded-sm ${cellValue > 2 ? " bg-[#00952A] bg-opacity-10 font-bold  text-[#00952A]" : cellValue < 2 && cellValue > 0 ? "bg-[#C26900] bg-opacity-10 font-bold text-[#C26900] " : "bg-[#ef4444] bg-opacity-10 font-bold text-[#ef4444]"}
                          
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
                        className="py-2 px-4 text-center"
                        style={{ width: column.width }}
                      >
                        {row.product_cost !== 0
                          ? `${((row.profit / row.product_cost) * 100).toFixed(0)} %`
                          : "N/A"}
                        {/* {`${(row.profit / row.product_cost).toFixed(2)}%`} */}
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
