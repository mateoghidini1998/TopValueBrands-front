type OrderTagsProps = {
  status: string;
};

const enum TAG_STATUS {
  PENDING = "Pending",
  APPROVED = "Approved",
  REJECTED = "Rejected",
  CANCELLED = "Cancelled",
}

const getColorClass = (status: string) => {
  switch (status) {
    case TAG_STATUS.PENDING:
      return "bg-gray-500";
    case TAG_STATUS.APPROVED:
      return "bg-green-500";
    case TAG_STATUS.REJECTED:
      return "bg-red-500";
    case TAG_STATUS.CANCELLED:
      return "bg-yellow-500";
    default:
      return "bg-gray-300"; // default color for unknown statuses
  }
};

export const OrderTags = ({ status }: OrderTagsProps) => {
  return (
    <div className="flex flex-row gap-2 items-center">
      <div className={`w-3 h-3 rounded-full ${getColorClass(status)}`}></div>
      <p>{status}</p>
    </div>
  );
};
