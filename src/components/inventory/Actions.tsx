"use client";
import { EditButton } from "../svgs/EditButton";
import { DeleteButton } from "../svgs/DeleteButton";

type RowActionsProps = {
  onEdit: () => void;
  onDelete: () => void;
};

export default function RowActions({ onEdit, onDelete }: RowActionsProps) {
  return (
    <div className="absolute bg-white border-[#EFF1F3] text-black right-0 mt-2 w-48 rounded-md shadow-lg dark:bg-dark-2  dark:ring-black ring-opacity-5 z-[1000] border-s-2-[#7e7e7e]">
      <div
        className="py-1"
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="options-menu"
      >
        <button
          onClick={onEdit}
          className="w-full flex flex-start items-center gap-2 px-4 py-2 text-sm dark:text-white dark:hover:bg-dark-3 "
          role="menuitem"
        >
          <EditButton/>
          Edit
        </button>
        <button
          onClick={onDelete}
          className="w-full flex flex-start items-center gap-2 px-4 py-2 text-sm text-red-500 dark:text-white dark:hover:bg-dark-3 "
          role="menuitem"
        >
          <DeleteButton />
          Delete
        </button>
      </div>
    </div>
  );
}
