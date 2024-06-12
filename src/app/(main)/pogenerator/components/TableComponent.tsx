import { TableComponentProps } from "../interfaces/ITableComponent";

export const TableComponent = <T,>({
  columns,
  data,
}: TableComponentProps<T>) => {
  return (
    <>
      <table className="min-w-full bg-dark border border-[#393E4F] h-full">
        <thead className="h-[60px] right-0 text-xs font-medium text-center whitespace-nowrap bg-dark-2">
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                className=" py-2 px-4 border-b border-[#393E4F] text-xs font-medium text-white"
              >
                {column.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="">
          {data.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className="text-white bg-dark text-xs font-medium text-center whitespace-nowrap"
            >
              {columns.map((column) => (
                <td
                  key={column.key}
                  className="py-2 px-4 border-b border-[#393E4F]"
                >
                  {(row as any)[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
