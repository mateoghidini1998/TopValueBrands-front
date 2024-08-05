import SuppliersTable from "@/components/suppliers/SuppliersTable";
import { SupplierProvider } from "@/contexts/suppliers.context";

export default function SuppliersPage() {
  return (
    <SupplierProvider>
      <main className="flex w-full p-14 min-h-screen flex-col items-center dark:bg-dark">
        <SuppliersTable />
      </main>
    </SupplierProvider>
  );
}
