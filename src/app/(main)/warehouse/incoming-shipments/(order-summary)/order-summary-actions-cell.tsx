// src/components/StatusCell.tsx
"use client";

import CancelButton from "@/components/svgs/CancelButton";
import SaveButton from "@/components/svgs/SaveButton";

type ActionsCellProps = {
  row: any;
};

const OrderSummaryActionsCell = ({ row }: ActionsCellProps) => {
  // console.log(row.original);
  const incomingOrder = row.original;
  return (
    <div className="flex items-center justify-end gap-2">
      <button>
        <SaveButton />
      </button>
      <button>
        <CancelButton />
      </button>
    </div>
  );
};

export default OrderSummaryActionsCell;
