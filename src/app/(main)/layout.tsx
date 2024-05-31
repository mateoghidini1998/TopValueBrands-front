import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import IndexPageContainer from "./page.container";
import SearchInput from "@/components/inventory/SearchInput";
import UserMenu from "@/components/layout/UserMenu";
import PageTitle from "@/components/layout/PageTitlte";
import { ProductProvider } from "@/contexts/products.context";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex">
      <IndexPageContainer>
        <Navbar />
        <div className="main_layout">
          <ProductProvider>
          <div className="table_header py-10 px-[46px]  flex justify-between items-center fixed top-0 z-40 bg-white text-black dark:bg-dark">
              <PageTitle/>
              <div className="flex items-center ">
                <SearchInput/>
                <UserMenu/>
              </div>
          </div>
          {children}
          </ProductProvider>
        </div>
      </IndexPageContainer>  
      </body>
    </html>
  );
}
