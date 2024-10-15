// src/components/StatusCell.tsx
"use client";

import CancelButton from "@/components/svgs/CancelButton";
import SaveButton from "@/components/svgs/SaveButton";

type ActionsCellProps = {
  row: any;
};

const ActionsCell = ({ row }: ActionsCellProps) => {
  const incomingOrder = row.original;
  return (
    <div className="flex items-center justify-end gap-2">
      <button>
        <SaveButton />
      </button>
      <button>
        <CancelButton />
      </button>
      <button></button>
    </div>
  );
};

export default ActionsCell;
