import IndexPageContainer from "./page.container";
import Table from "@/components/inventory/Table";

export default function Home() {
  return (
    <IndexPageContainer>
      <main className="flex w-full min-h-screen flex-col items-center">
        <Table/>
      </main>
    </IndexPageContainer>
  );
}
