import SearchInput from "@/components/inventory/SearchInput";
import IndexPageContainer from "./page.container";
import Table from "@/components/inventory/Table";
import UserMenu from "@/components/layout/UserMenu";

export default function Home() {
  return (
    <IndexPageContainer>
      <main className="flex w-full min-h-screen flex-col items-center">
        <Table/>
      </main>
    </IndexPageContainer>
  );
}
