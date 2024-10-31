"use client";
import { DataTable } from "@/components/ui/data-table";
import IndexPageContainer from "../../page.container";
import { columns } from "./columns";
import { useStorageContext } from "@/contexts/storage.context";

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
