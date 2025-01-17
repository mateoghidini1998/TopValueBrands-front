// src/components/StatusCell.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
type ActionsCellProps = {
  row: any;
};

const ActionsCell = ({ row }: ActionsCellProps) => {
  const router = useRouter();

  const handleDeletePallet = async (id: number) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/pallets/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!res.ok) {
        throw new Error("Failed to delete pallet");
      } else {
        toast.success("Pallet deleted successfully");
        router.refresh();
      }
    } catch (error) {
      toast.error("Error deleting pallet");
      console.error("Error deleting pallet:", error);
    }
  };

  const incomingOrder = row.original;
  return (
    <div className="flex items-center justify-end gap-2">
      <Dialog>
        <DropdownMenu key={incomingOrder.id}>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DialogTrigger asChild>
              <DropdownMenuItem
                className="w-full"
                onClick={() => {
                  router.push(`/warehouse/storage/${incomingOrder.id}`);
                }}
              >
                View Details
              </DropdownMenuItem>
            </DialogTrigger>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => handleDeletePallet(incomingOrder.id)}
            >
              Delete Pallet
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Dialog for View Details */}
      </Dialog>
    </div>
  );
};

export default ActionsCell;
