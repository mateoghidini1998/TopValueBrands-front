import Table from "@/components/users/Table";
import { UsersProvider } from "@/contexts/users.context";

export default function UsersPage() {
    return (
      <UsersProvider>
        <main className="flex w-full p-14 min-h-screen flex-col items-center">
          <h1>POGenerator Page</h1>
          <Table/>
        </main>
      </UsersProvider>
    );
  }