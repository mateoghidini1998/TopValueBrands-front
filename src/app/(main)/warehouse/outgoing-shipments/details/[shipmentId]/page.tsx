"use client";

import { DataTable } from "@/components/ui/data-table";
import GoBackButton from "@/components/ui/go-back-button";
import { useEffect, useState } from "react";
import { PalletProduct } from "../../interfaces";
import { columns } from "./columns";
import { Loader2Icon } from "lucide-react";

interface ShipmentData {
  id: number;
  shipment_number: string;
  status: string;
  fba_shipment_id: string;
  createdAt: string;
  updatedAt: string;
  PalletProducts: PalletProduct[];
}

export default function OutgoingShipmentDetails({
  params,
}: {
  params: { shipmentId: string };
}) {
  const [palletProducts, setPalletProducts] = useState<PalletProduct[]>([]);

  const [loading, setLoading] = useState(false);

  const [shipmentData, setShipmentData] = useState<ShipmentData>({
    id: 0,
    shipment_number: "",
    status: "",
    fba_shipment_id: "",
    createdAt: "",
    updatedAt: "",
    PalletProducts: [],
  });

  useEffect(() => {
    const fetchPalletProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/shipments/${params.shipmentId}`
        );
        const data = await response.json();
        setPalletProducts(data.PalletProducts);
        setShipmentData(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchPalletProducts();
  }, [params.shipmentId]);

  // console.log(palletProducts);

  if (loading) {
    return (
      <div className="h-[calc(100vh-20rem)] w-full flex items-center justify-center">
        <Loader2Icon className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="w-full px-[1.3rem] py-0 flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-bold">
          Work Order #: MANIFEST-{shipmentData?.shipment_number}
        </h2>
        <span className="font-semibold">
          Date Work Order Issued:{" "}
          {new Date(shipmentData?.createdAt).toDateString()}{" "}
        </span>
      </div>

      <DataTable columns={columns} data={palletProducts} />
    </div>
  );
}
