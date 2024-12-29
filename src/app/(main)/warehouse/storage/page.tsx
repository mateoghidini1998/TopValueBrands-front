"use client";
import { DataTable } from "@/components/ui/data-table";
import IndexPageContainer from "../../page.container";
import { columns } from "./columns";
import { useStorageContext } from "@/contexts/storage.context";
import { useEffect } from "react";
import { Loader2Icon } from "lucide-react";

export default function StoragePage() {
  const { pallets, getPallets, loading } = useStorageContext();

  useEffect(() => {
    getPallets?.();
  }, []);

  if (loading) {
    return (
      <div className="h-[calc(100vh-20rem)] w-full flex items-center justify-center">
        <Loader2Icon className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <IndexPageContainer>
      <div className="w-full px-[1.3rem] py-0">
        <DataTable columns={columns} data={pallets} dataLength={10} />
      </div>
    </IndexPageContainer>
  );
}
