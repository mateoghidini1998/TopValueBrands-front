"use client";
import { useEffect, useRef, useState } from "react";
import { EditButton } from "../svgs/EditButton";
import { DeleteButton } from "../svgs/DeleteButton";
import useOnClickOutside from "@/hooks/useOnClickOutside";
import useThemeContext from "@/contexts/theme.context";

type RowActionsProps = {
  onEdit: () => void;
  onDelete: () => void;
  onClose: () => void; // Añade un handler para cerrar el menú
};

export default function RowActions({
  onEdit,
  onDelete,
  onClose,
}: RowActionsProps) {
  const ref = useRef(null);

  useOnClickOutside(ref, () => {
    onClose();
  });

  const { theme } = useThemeContext();
  const [editColor, setEditColor] = useState(
    theme === "dark" ? "#ADB3CC" : "#393E4F"
  );
  const [deleteColor, setDeleteColor] = useState(
    theme === "dark" ? "#ADB3CC" : "#FF4C3F"
  );

  useEffect(() => {
    setEditColor(theme === "dark" ? "#ADB3CC" : "#393E4F");
    setDeleteColor(theme === "dark" ? "#ADB3CC" : "#FF4C3F");
  }, [theme]);

  return (
    <div
      ref={ref}
      className="absolute bg-white border-[#EFF1F3] text-black right-0 mt-2 w-48 rounded-md shadow-lg dark:bg-dark-2 dark:ring-black ring-opacity-5 z-[5] border-s-2-[#7e7e7e]"
    >
      <div
        className="py-1"
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="options-menu"
      >
        <button
          onClick={onEdit}
          className="w-full flex flex-start items-center gap-2 px-4 py-2 text-sm text-[#393E4F] dark:text-white dark:hover:bg-dark-3 "
          role="menuitem"
        >
          <EditButton color={editColor} />
          Edit
        </button>
        <button
          onClick={onDelete}
          className="w-full flex flex-start items-center gap-2 px-4 py-2 text-sm text-[#EF4444] dark:text-white dark:hover:bg-dark-3 "
          role="menuitem"
        >
          <DeleteButton color={deleteColor} />
          Delete
        </button>
      </div>
    </div>
  );
}
