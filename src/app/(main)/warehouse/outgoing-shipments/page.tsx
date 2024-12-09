"use client";

import { DataTable } from "@/components/ui/data-table";
import { ShipmentsService } from "@/services/shipments/shipments.service";
import IndexPageContainer from "../../page.container";
import { columns } from "./columns";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function OutgoingShipments() {
  const [shipments, setShipments] = useState([]);

  useEffect(() => {
    const fetchShipments = async () => {
      const response = await ShipmentsService.getShipments();
      setShipments(response.shipments);
    };
    fetchShipments();
  }, []);

  return (
    <IndexPageContainer>
      <div className="w-full px-[1.3rem] py-0">
        <Button variant="outline">
          <Link href="/warehouse/outgoing-shipments/new-shipment">
            New Shipment
          </Link>
        </Button>
        <DataTable columns={columns} data={shipments} />
      </div>
    </IndexPageContainer>
  );
}
