import { DataTable } from "@/components/ui/data-table";
import { ShipmentsService } from "@/services/shipments/shipments.service";
import IndexPageContainer from "../../page.container";
import { columns } from "./columns";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function OutgoingShipments() {
  const shipments = await ShipmentsService.getShipments();
  return (
    <IndexPageContainer>
      <div className="w-full px-[1.3rem] py-0">
        <Button variant="outline">
          <Link href="/warehouse/outgoing-shipments/new-shipment">
            New Shipment
          </Link>
        </Button>
        <DataTable columns={columns} data={shipments.shipments} />
      </div>
    </IndexPageContainer>
  );
}
