import CancelButton from "@/components/svgs/CancelButton";
import ConfirmButton from "@/components/svgs/ConfirmButton";
import DownloadIcon from "@/components/svgs/DownloadIcon";

export const OrderActions = () => {
  return (
    <div className="flex justify-end items-center gap-4">
      <button className="flex items-center gap-2 justify-between bg-[#393E4F] py-1 px-2 rounded-lg">
        Download PDF
        <DownloadIcon />
      </button>
      <ConfirmButton />
      <CancelButton />
    </div>
  );
};
