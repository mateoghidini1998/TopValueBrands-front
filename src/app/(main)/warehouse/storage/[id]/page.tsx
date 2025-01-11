import { Metadata } from "next";
import PalletInformation from "./pallet-information";
import PalletProducts from "./pallet-product";
import QrCode from "./qr-code";
import { Pallet, Props } from "./types/interfaces";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/pallets/${params.id}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    return {
      title: "Pallet no encontrado",
    };
  }

  const data: Pallet = await res.json();

  return {
    title: `Warehouse - Pallet #${data.pallet_number}`,
  };
}

export default async function StoragePage({ params }: Props) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/pallets/${params.id}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const data: Pallet = await res.json();

  return (
    <div className="w-full p-6">
      <div className="grid gap-6 md:grid-cols-1">
        <QrCode data={data} />
        <PalletInformation pallet={data} />
        <PalletProducts palletProducts={data.PalletProducts} />
      </div>
    </div>
  );
}
