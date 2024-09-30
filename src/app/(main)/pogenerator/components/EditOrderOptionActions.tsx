import React, { useEffect, useRef, useState } from "react";
import { Actions } from "./TableComponent";
import { IoMdDownload } from "react-icons/io";

import { EditButton } from "@/components/svgs/EditButton";
import { DeleteButton } from "@/components/svgs/DeleteButton";
import useOnClickOutside from "@/hooks/useOnClickOutside";
import useThemeContext from "@/contexts/theme.context";

interface EditOrderOptionActionsProps {
  hidden?: boolean;
  actionElements: any;
  actionHandlers: Actions<any>;
  row: any;
  setEditOrderAction: React.Dispatch<React.SetStateAction<any>>; // Agregar el tipo de prop
}

const EditOrderOptionActions: React.FC<EditOrderOptionActionsProps> = ({
  hidden = true,
  actionElements,
  actionHandlers,
  row,
  setEditOrderAction, // Recibir la prop
}) => {
  const { theme } = useThemeContext();
  const [editColor, setEditColor] = useState(
    theme === "dark" ? "#ADB3CC" : "#393E4F"
  );
  const [deleteColor, setDeleteColor] = useState(
    theme === "dark" ? "#ADB3CC" : "#FF4C3F"
  );

  const ref = useRef(null);

  useOnClickOutside(ref, () => {
    setEditOrderAction(null);
  });

  useEffect(() => {
    setEditColor(theme === "dark" ? "#ADB3CC" : "#393E4F");
    setDeleteColor(theme === "dark" ? "#ADB3CC" : "#FF4C3F");
  }, [theme]);

  return (
    <div
      ref={ref}
      className="absolute bg-white right-[20px] top-[45px] mt-2 rounded-md shadow-lg dark:bg-dark ring-1 ring-black ring-opacity-5 z-[1000] text-black dark:text-white w-[50%]"
    >
      <div
        className="py-1"
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="options-menu"
      >
        <button
          onClick={() => actionHandlers.edit!(row)}
          className="w-full flex flex-start px-4 py-2 text-sm dark:text-white dark:hover:bg-dark-2 gap-2 items-center hover:bg-light-2"
          role="menuitem"
        >
          <EditButton color={editColor} />
          Edit
        </button>
        <button
          onClick={() => actionHandlers.download!(row)}
          className="w-full flex flex-start px-4 py-2 text-sm dark:text-white dark:hover:bg-dark-2 gap-2 items-center hover:bg-light-2"
          role="menuitem"
        >
          <IoMdDownload />
          Download
        </button>
        <button
          onClick={() => actionHandlers.remove!(row)}
          className="w-full flex flex-start px-4 py-2 text-sm text-red-500 dark:text-white dark:hover:bg-dark-2 gap-2 items-center hover:bg-light-2"
          role="menuitem"
        >
          <DeleteButton color={deleteColor} />
          Delete
        </button>
      </div>
    </div>
  );
};

export default EditOrderOptionActions;
