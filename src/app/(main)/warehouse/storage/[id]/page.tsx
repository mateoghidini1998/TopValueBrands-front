import PalletInformation from "./pallet-information";
import PalletProducts from "./pallet-product";
import { Pallet, Props } from "./types/interfaces";

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

  // console.log(data);

  return (
    <div className="w-full p-6">
      <div className="grid gap-6 md:grid-cols-1">
        <PalletInformation pallet={data} />
        <PalletProducts palletProducts={data.PalletProducts} />
      </div>
    </div>
  );
}
