import type { Metadata } from "next";
import { TrackedProductsProvider } from "../../../contexts/trackedProducts.context";
import IndexPageContainer from "../page.container";
import { POGeneratorNavbar } from "./components/POGeneratorNavbar";
import { OrdersProvider } from "@/contexts/orders.context";

export const metadata: Metadata = {
  title: "PO Generator - TVB",
  description: "Generated by create next app",
};

export default function POGeneratorLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const navLinks = [
    {
      name: "Generator",
      href: "/pogenerator/create",
    },
    {
      name: "Orders",
      href: "/pogenerator/orders",
    },
  ];

  return (
    <>
      <IndexPageContainer>
        <OrdersProvider>
          <main className="flex w-full h-fit flex-col items-center mt-[56px] relative">
            <TrackedProductsProvider>
              <POGeneratorNavbar navLinks={navLinks} />
              {children}
            </TrackedProductsProvider>
          </main>
        </OrdersProvider>
      </IndexPageContainer>
    </>
  );
}
