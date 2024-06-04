import Table from "@/components/users/Table";
import { UsersProvider } from "@/contexts/users.context";

export default function UsersPage() {
    return (
      <UsersProvider>
        <main className="flex w-full p-14 min-h-screen flex-col items-center dark:bg-dark">
          <Table/>
        </main>
      </UsersProvider>
    );
  }