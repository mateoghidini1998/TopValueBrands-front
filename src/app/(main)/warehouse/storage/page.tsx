"use client";
import { DataTable } from "@/components/ui/data-table";
import { useStorageContext } from "@/contexts/storage.context";
import IndexPageContainer from "../../page.container";
import { columns } from "./columns";

export default function StoragePage() {
  const { pallets } = useStorageContext();
  return (
    <IndexPageContainer>
      <div className="w-full px-[1.3rem] py-0">
        <DataTable columns={columns} data={pallets} dataLength={10} />
      </div>
    </IndexPageContainer>
  );
}
