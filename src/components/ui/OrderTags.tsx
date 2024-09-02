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
      return "bg-[#C26900] text-[#C26900]";
    case TAG_STATUS.APPROVED:
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
    case TAG_STATUS.APPROVED:
      return "Good to go";
    case TAG_STATUS.REJECTED:
      return "Rejected";
    case TAG_STATUS.CANCELLED:
      return "Needs revision";
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
