type OrderTagsProps = {
  status: string;
};

const enum TAG_STATUS {
  PENDING = "PENDING",
  GOOD_TO_GO = "GOOD TO GO",
  REJECTED = "REJECTED",
  CANCELLED = "CANCELLED",
  IN_TRANSIT = "IN TRANSIT",
  ARRIVED = "ARRIVED",
  WAITING_FOR_SUPPLIER_APPROVAL = "WAITING FOR SUPPLIER APPROVAL",
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
    case TAG_STATUS.IN_TRANSIT:
      return "bg-[#007BFF] text-[#007BFF]"; // updated color
    case TAG_STATUS.ARRIVED:
      return "bg-[#28A745] text-[#28A745]"; // updated color
    case TAG_STATUS.WAITING_FOR_SUPPLIER_APPROVAL:
      return "bg-[#FFC107] text-[#FFC107]"; // updated color
    case TAG_STATUS.CLOSED:
      return "bg-[#6C757D] text-[#6C757D]"; // updated color
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
    case TAG_STATUS.IN_TRANSIT:
      return "In transit";
    case TAG_STATUS.ARRIVED:
      return "Arrived";
    case TAG_STATUS.WAITING_FOR_SUPPLIER_APPROVAL:
      return "Waiting for supplier approval";
    case TAG_STATUS.CLOSED:
      return "Closed";
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
