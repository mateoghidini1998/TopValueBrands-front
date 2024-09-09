type OrderTagsProps = {
  status: string;
};

const enum TAG_STATUS {
  PENDING = "PENDING",
  GOOD_TO_GO = "GOOD TO GO",
  REJECTED = "REJECTED",
  CANCELLED = "CANCELLED",
  IN_TRANSIT = "IN_TRANSIT",
  ARRIVED = "ARRIVED",
  WATING_FOR_SUPPLIER_APPROVAL = "WAITING_FOR_SUPPLIER_APPROVAL",
  CLOSED = "CLOSED",
}

const getColorClass = (status: string) => {
  switch (status) {
    case TAG_STATUS.PENDING:
      return "bg-[#C26900] text-[#C26900]";
    case TAG_STATUS.GOOD_TO_GO:
      return "bg-[#00952A] text-[#00952A]";
    case TAG_STATUS.REJECTED:
      return "bg-[#ef4444] text-[#ef4444]";
    case TAG_STATUS.CANCELLED:
      return "bg-yellow-500 text-yellow-500";
    default:
      return "bg-gray-300 text-gray-300"; // default color for unknown statuses
  }
};

const changeName = (status: string) => {
  switch (status) {
    case TAG_STATUS.PENDING:
      return "Pending";
    case TAG_STATUS.GOOD_TO_GO:
      return "Good to go";
    case TAG_STATUS.REJECTED:
      return "Rejected";
    case TAG_STATUS.CANCELLED:
      return "Cancelled";
    default:
      return "Unknown";
  }
};

export const OrderTags = ({ status }: OrderTagsProps) => {
  const colorClasses = getColorClass(status).split(" ");
  const bgColorClass = colorClasses[0];
  const textColorClass = colorClasses[1];

  return (
    <div
      className={`min-w-[80px] py-2 bg-opacity-10 rounded cursor-pointer  ${bgColorClass}`}
    >
      <p className={`font-bold bg-transparent ${textColorClass}`}>
        {changeName(status)}
      </p>
    </div>
  );
};
