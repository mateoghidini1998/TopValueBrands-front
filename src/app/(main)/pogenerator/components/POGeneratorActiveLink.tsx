"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
  path: string;
  title: string;
};

export const POGeneratorActiveLink = ({ path, title }: Props) => {
  const pathname = usePathname();

  return (
    <Link href={path} className="">
      <p
        className={`rounded-full ${pathname === path ? "bg-[#438EF3] text-white px-4 py-1 " : " bg-[#438EF3] text-[#438EF3] bg-opacity-20 px-4 py-1  border-solid border-[1px] border-[#438EF3] "}`}
      >
        {title}
      </p>
    </Link>
  );
};
