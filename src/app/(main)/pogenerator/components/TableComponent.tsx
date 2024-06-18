'use client';
import { ProductNameTableData } from "@/components/inventory/ProductNameTableData";
import { TableComponentProps } from "../interfaces/ITableComponent";
import { NumberInput } from "./QuantityInput";
export const TableComponent = <T,>({
  columns,
  data,
  actions,
  dispatchAction,
  actionsWidth = "600px",
  tableHeigth = "100%",
  tableMaxHeight = "100%",
}: TableComponentProps<T>) => {
  const TABLE_COLUMNS = columns;
  const TABLE_ROWS = data;

  // check if actions exists on  the TABLE_COLUMNS
  if (actions && !TABLE_COLUMNS.find((column) => column.key === "actions")) {
    TABLE_COLUMNS.push({
      key: "actions",
      name: "Actions",
      width: actionsWidth,
    });
  }

  return (
    <div className="scroll-container mt-8">
      <div className={`table-wrapper`} style={{ height: tableHeigth , maxHeight: tableMaxHeight}}>
        <table
          className={`${tableHeigth} max-h-[${tableMaxHeight}] w-full bg-white dark:bg-dark transition-colors duration-[0.6s] ease-in-out`}
        >
          <thead className="pogenerator_table_header right-0 bg-white text-light dark:bg-dark-3 dark:text-white">
            <tr className="m-0 py-6 stroke-1 stroke-dark-3 h-[60px] bg-[#F8FAFC] text-black dark:text-white dark:bg-dark-2 transition-colors duration-[0.6s] ease-in-out flex items-center justify-between">
              {TABLE_COLUMNS.map((column) => (
                <th
                  key={column.key}
                  className={`py-2 px-4 text-xs font-medium whitespace-nowrap ${column.key === "actions" ? "text-right" : "text-center"}`}
                  style={{ width: column.width }}
                >
                  {column.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {TABLE_ROWS.map((row, rowIndex) => (
              
              <tr
                key={rowIndex}
                className="text-white h-[60px] bg-dark text-xs font-medium flex items-center justify-between border-b border-[#393E4F]"
              >
                {TABLE_COLUMNS.map((column) =>
                  column.key === "actions" ? (
                    <td
                      width={column.width}
                      key={column.key}
                      className="py-2 px-4 text-right"
                    >
                      {dispatchAction && <button onClick={() => dispatchAction(row)}>{actions}</button>}
                    </td>
                  ) :
                  column.key === "product_name" ? (
                    <ProductNameTableData key={column.key} product={row} width={column.width} />
                    ) :
                      
                      column.key === 'quantity' || column.key === 'unit_price' ? (
                        <td
                      key={column.key}
                      className="py-2 px-4 text-center flex items-center justify-center gap-4"
                      style={{ width: column.width }}
                        >
                          {`$`}
                      <NumberInput
                        value={(row as any)[column.key]}
                            onChange={(newValue) => {
                          (row as any)[column.key] = newValue
                        }}
                      />
                    </td>
                      )
                        :
                        column.key === 'total_amount' ? (
                          <td
                            key={column.key}
                            className="py-2 px-4 text-center"
                            style={{ width: column.width }}
                          >
                            {(row as any)[column.key]}
                          </td>
                        ) :
                    (
                    <td
                      key={column.key}
                      className="py-2 px-4 text-center"
                      style={{ width: column.width }}
                    >
                      {(row as any)[column.key]}
                    </td>
                  )
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
