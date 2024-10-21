type DateCellProps = {
  value: string;
};

const DateCell = ({ value }: DateCellProps) => {
  const date = new Date(value);

  return (
    // <div className="flex items-center gap-2">
    <span>{date.toLocaleString().replace(",", " -")}</span>
    // </div>
  );
};

export default DateCell;
