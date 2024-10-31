import SuppliersTable from "@/components/suppliers/SuppliersTable";
import { StorageProvider } from "@/contexts/storage.context";

export default function SuppliersPage() {
  return (
    <StorageProvider>
      <main className="flex w-full p-14 min-h-screen flex-col items-center dark:bg-dark">
        <SuppliersTable />
      </main>
    </StorageProvider>
  );
}
