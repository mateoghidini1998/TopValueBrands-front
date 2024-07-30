"use client";
import { useTrackedProductContext } from "@/contexts/trackedProducts.context";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";

export interface OrderByComponentProps {
  orderBy: string;
}

export const OrderByComponent = ({ orderBy }: OrderByComponentProps) => {
  const { handleSetOrderBy } = useTrackedProductContext();

  return (
    <div className="flex flex-col items-center">
      <button onClick={() => handleSetOrderBy(orderBy, "desc")}>
        <IoMdArrowDropup />
      </button>
      <button onClick={() => handleSetOrderBy(orderBy, "asc")}>
        <IoMdArrowDropdown />
      </button>
    </div>
  );
};
