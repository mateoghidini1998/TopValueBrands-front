"use client"
type RowActionsProps = {
  onEdit: () => void;
  onDelete: () => void;
};

export default function RowActions({ onEdit, onDelete }: RowActionsProps) {
    return (
        <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-[#262935] ring-1 ring-black ring-opacity-5 z-99">
            <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                <button onClick={onEdit} className="w-full flex flex-start block px-4 py-2 text-sm text-white hover:bg-[#393E4F] " role="menuitem">Edit</button>
                <button onClick={onDelete} className="w-full flex flex-start block px-4 py-2 text-sm text-white hover:bg-[#393E4F] " role="menuitem">Delete</button>
            </div>
        </div>
    );
}
