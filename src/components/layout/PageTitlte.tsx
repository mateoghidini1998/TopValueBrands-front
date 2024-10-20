"use client";

import { LINKS, MAIN_ROUTES } from "@/constants/links";
import { usePathname } from "next/navigation";

export default function PageTitle() {
  const pathname = usePathname();

  const currentLink = LINKS.find((link) => link.href === pathname);
  const currentMainRoute = MAIN_ROUTES.find((link) => link.href === pathname);

  console.log(pathname);

  return (
    <>
      <div className="flex items-center gap-2">
        {currentMainRoute?.icon}
        <h4 className="text-black dark:text-white text-base font-bold leading-6">
          {currentMainRoute?.title}
        </h4>
      </div>
    </>
  );
}
