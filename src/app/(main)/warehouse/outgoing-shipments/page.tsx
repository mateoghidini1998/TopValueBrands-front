import { DataTable } from "@/components/ui/data-table";
import { ShipmentsService } from "@/services/shipments/shipments.service";
import IndexPageContainer from "../../page.container";
import { columns } from "./columns";

export default async function OutgoingShipments() {
  const shipments = await ShipmentsService.getShipments();
  return (
    <IndexPageContainer>
      <div className="w-full px-[1.3rem] py-0">
        <DataTable columns={columns} data={shipments.shipments} />
      </div>
    </IndexPageContainer>
  );
}
