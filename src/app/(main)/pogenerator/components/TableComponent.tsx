import { TableComponentProps } from "../interfaces/ITableComponent";

export const TableComponent = <T,>({
  columns,
  data,
  
}: TableComponentProps<T>) => {

  return (
    <div className="scroll-container">
      <table className="w-full bg-white dark:bg-dark transition-colors duration-[0.6s] ease-in-out">
        <thead className="pogenerator_table_header right-0 bg-white text-light dark:bg-dark-3 dark:text-white">
          <tr className="m-0 py-6 stroke-1 stroke-dark-3 h-[60px] bg-[#F8FAFC] text-black dark:text-white dark:bg-dark-2 transition-colors duration-[0.6s] ease-in-out flex items-center justify-between">
            {columns.map((column) => (
              <th
                key={column.key}
                className="py-2 px-4 text-xs font-medium text-white text-center"
                style={{ width: column.width }}
              >
                {column.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className="text-white h-[60px] bg-dark text-xs font-medium flex items-center justify-between border-b border-[#393E4F]"
            >
              {columns.map((column) => (
                <td
                  key={column.key}
                  className="py-2 px-4 text-center"
                  style={{ width: column.width }}
                >
                  {(row as any)[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};