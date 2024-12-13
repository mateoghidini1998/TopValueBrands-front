"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ShipmentsService } from "@/services/shipments/shipments.service";
import { Row } from "@tanstack/react-table";
import { Download, Eye, MoreHorizontal, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { Shipment } from "./interfaces";
interface ActionsCellProps {
  row: Row<Shipment>;
}

export default function ActionsCell({ row }: ActionsCellProps) {
  const router = useRouter();
  const shipment = row.original;

  const handleDownload2DWorkflow = async (id: number) => {
    try {
      await ShipmentsService.download2DWorkflow(id);
    } catch (error) {
      console.error("Error downloading 2D workflow:", error);
    }
  };

  return (
    <div className="text-right">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() =>
              navigator.clipboard.writeText(row.getValue("order_number"))
            }
          >
            Copy order number
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() =>
              router.push(
                `/warehouse/outgoing-shipments/details/${shipment.id}`
              )
            }
          >
            <Eye className="mr-2 h-4 w-4" />
            View details
          </DropdownMenuItem>
          <DropdownMenuItem
            className="hover:bg-dark-2/90 cursor-pointer"
            onClick={() => handleDownload2DWorkflow(shipment.id)}
          >
            <Download className="mr-2 h-4 w-4" />
            Download 2D Workflow
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => console.log("Delete", row.original)}>
            <Trash className="mr-2 h-4 w-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
