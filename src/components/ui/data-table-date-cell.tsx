type DateCellProps = {
  value: string;
};

const DateCell = ({ value }: DateCellProps) => {
  return (
    // <div className="flex items-center gap-2">
    <span>{`${new Date(value)
      .toLocaleString("en-US", {
        month: "2-digit",
        day: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      })
      .replace(",", "")}`}</span>
    // </div>
  );
};

export default DateCell;
