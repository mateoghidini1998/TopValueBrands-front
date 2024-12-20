"use client";

import { MAIN_ROUTES } from "@/constants/links";
import { usePathname, useRouter } from "next/navigation";
import { BiArrowBack } from "react-icons/bi";

export default function PageTitle() {
  const pathname = usePathname();
  const router = useRouter();
  const currentMainRoute = MAIN_ROUTES.find((link) =>
    matchRoute(pathname, link.href)
  );

  function matchRoute(path: string, href: string) {
    const pathSegments = path.split("/").filter(Boolean);
    const hrefSegments = href.split("/").filter(Boolean);

    if (pathSegments.length !== hrefSegments.length) return false;

    return hrefSegments.every((segment, index) => {
      return segment.startsWith(":") || segment === pathSegments[index];
    });
  }

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
