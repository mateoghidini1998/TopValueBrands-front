"use client";

import { MAIN_ROUTES } from "@/constants/links";
import { usePathname, useRouter } from "next/navigation";
import { BiArrowBack } from "react-icons/bi";

export default function PageTitle() {
  const pathname = usePathname();
  const router = useRouter();
  const currentMainRoute = MAIN_ROUTES.find((link) => link.href === pathname);
  return (
    <>
      <div className="flex items-center gap-2">
        <BiArrowBack
          className="text-black dark:text-white cursor-pointer"
          onClick={() => router.back()}
        />
        {currentMainRoute?.icon}
        <h4 className="text-black dark:text-white text-base font-bold leading-6">
          {currentMainRoute?.title}
        </h4>
      </div>
    </>
  );
}
