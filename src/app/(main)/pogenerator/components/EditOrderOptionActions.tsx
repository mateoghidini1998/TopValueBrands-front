import React from "react";
import { Actions } from "./TableComponent";
import { ActionButtons } from "./ActionButtons";

interface EditOrderOptionActionsProps {
  hidden?: boolean;
  actionElements: any;
  actionHandlers: Actions<any>;
  row: any;
}

const EditOrderOptionActions: React.FC<EditOrderOptionActionsProps> = ({
  hidden = true,
  actionElements,
  actionHandlers,
  row,
}) => {
  return (
    <div
      hidden={hidden}
      className="flex flex-col items-start gap-2 absolute z-50 bg-dark-2 text-white rounded shadow-md w-[100px] right-[50px] top-10 py-2"
    >
      <button
        className="hover:bg-dark-3 w-full m-auto py-1"
        onClick={() => {
          console.log(row);
          actionHandlers.edit!(row);
        }}
      >
        View Details
      </button>
      <button
        className="hover:bg-dark-3 w-full m-auto py-1"
        onClick={() => actionHandlers.remove!(row)}
      >
        Delete Order
      </button>
      <button
        className="hover:bg-dark-3 w-full m-auto py-1"
        onClick={() => actionHandlers.download!(row)}
      >
        Download PDF
      </button>
    </div>
  );
};

export default EditOrderOptionActions;
