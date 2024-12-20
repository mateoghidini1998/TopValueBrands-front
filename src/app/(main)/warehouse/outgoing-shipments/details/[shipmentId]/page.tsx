"use client";

import { DataTable } from "@/components/ui/data-table";
import GoBackButton from "@/components/ui/go-back-button";
import { useEffect, useState } from "react";
import { PalletProduct } from "../../interfaces";
import { columns } from "./columns";

export default function OutgoingShipmentDetails({
  params,
}: {
  params: { shipmentId: string };
}) {
  // console.log(params.shipmentId);

  const [palletProducts, setPalletProducts] = useState<PalletProduct[]>([]);

  useEffect(() => {
    const fetchPalletProducts = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/shipments/${params.shipmentId}`
        );
        const data = await response.json();
        setPalletProducts(data.PalletProducts);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchPalletProducts();
  }, [params.shipmentId]);

  // console.log(palletProducts);

  return (
    <div className="w-full px-[1.3rem] py-0">
      <GoBackButton />
      <DataTable columns={columns} data={palletProducts} />
    </div>
  );
}
