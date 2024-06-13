import type { Metadata } from "next";
import IndexPageContainer from "../page.container";
import { POGeneratorNavbar } from "./components/POGeneratorNavbar";

export const metadata: Metadata = {
  title: "Top Values Brand",
  description: "Generated by create next app",
};

export default function POGeneratorLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <IndexPageContainer>
        <main className="flex w-full min-h-screen flex-col items-center mt-[56px] relative">
          <POGeneratorNavbar />
          {children}
        </main>
      </IndexPageContainer>
    </>
  );
}