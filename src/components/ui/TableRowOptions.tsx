"use client";
type TableRowOptionsProps = {
  onEdit: (id: any) => void;
  onDelete: (id: any) => void;
};

export default function TableRowOptions({
  onEdit,
  onDelete,
}: TableRowOptionsProps) {
  return (
    <div className="absolute right-0 top-12 mt-2 w-48 rounded-md shadow-lg bg-[#262935] ring-1 ring-black ring-opacity-5 z-[1000]">
      <div
        className="py-1"
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="options-menu"
      >
        <button
          onClick={(id:any) => onEdit(id)}
          className="w-full flex flex-start  px-4 py-2 text-sm text-white hover:bg-[#393E4F] "
          role="menuitem"
        >
          Edit
        </button>
        <button
          onClick={(id:any) => onDelete(id)}
          className="w-full flex flex-start  px-4 py-2 text-sm text-white hover:bg-[#393E4F] "
          role="menuitem"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
