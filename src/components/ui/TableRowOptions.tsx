"use client";

import { DeleteButton } from "../svgs/DeleteButton";
import { EditButton } from "../svgs/EditButton";

type TableRowOptionsProps = {
  onEdit: (id: any) => void;
  onDelete: (id: any) => void;
};

export default function TableRowOptions({
  onEdit,
  onDelete,
}: TableRowOptionsProps) {
  return (
    <div className="absolute bg-white right-0 top-12 mt-2 w-48 rounded-md shadow-lg dark:bg-dark ring-1 ring-black ring-opacity-5 z-[1000] text-black dark:text-white ">
      <div
        className="py-1"
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="options-menu"
      >
        <button
          onClick={(id: any) => onEdit(id)}
          className="w-full flex flex-start  px-4 py-2 text-sm dark:text-white dark:hover:bg-dark-2 gap-2 items-center hover:bg-light-2 "
          role="menuitem"
        >
          <EditButton />
          Edit
        </button>
        <button
          onClick={(id: any) => onDelete(id)}
          className="w-full flex flex-start  px-4 py-2 text-sm text-red-500 dark:text-white dark:hover:bg-dark-2 gap-2 items-center hover:bg-light-2 "
          role="menuitem"
        >
          <DeleteButton />
          Delete
        </button>
      </div>
    </div>
  );
}
