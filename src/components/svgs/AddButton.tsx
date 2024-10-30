import React from "react";
import { IoMdAdd } from "react-icons/io";

export default function AddButton({ className }: { className?: string }) {
  return (
    <span
      {...{ className }}
      className="w-5 h-5 bg-[#438EF3] rounded-sm flex items-center justify-center"
    >
      <IoMdAdd className="text-white" />
    </span>
  );
}
