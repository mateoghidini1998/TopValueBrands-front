import { DataTable } from "@/components/ui/data-table";
import { ShipmentsService } from "@/services/shipments/shipments.service";
import { columns } from "./columns";
import GoBackButton from "@/components/ui/go-back-button";

export default async function OutgoingShipmentDetails({
  params,
}: {
  params: { shipmentId: string };
}) {
  const shipment = await ShipmentsService.getShipmentById(params.shipmentId);
  return (
    <div className="w-full px-[1.3rem] py-0">
      <GoBackButton />
      <DataTable columns={columns} data={shipment.PalletProducts} />
    </div>
  );
}
