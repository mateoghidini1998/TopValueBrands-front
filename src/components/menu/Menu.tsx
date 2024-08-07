"use client";
import Link from "next/link";
import { LinkType } from "@/types/link.types";
import { useState } from "react";
import { usePathname } from "next/navigation";
import TypewriterText from "../ui/TypeWriterText";

type MenuProps = {
  links: LinkType[];
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const Menu = ({ isOpen, setIsOpen, links }: MenuProps) => {
  const [activeLink, setActiveLink] = useState();
  const pathname = usePathname();

  return (
    <ul className="flex flex-col items-start w-full">
      {links.map((link, index) => (
        <li
          onClick={() => setIsOpen(true)}
          key={`${index}`}
          className={`mb-6 w-full flex items-center justify-start h-[40px] text-nowrap ${
            link.href === "/suppliers" &&
            pathname !== "/" &&
            pathname !== "/suppliers" &&
            "hidden"
          }`}
        >
          <Link
            href={link.href}
            className={`box-border w-full h-[40px] flex items-center px-6 font-semibold ease-in-out ${
              pathname === link.href
                ? "bg-[#438ef330] border-l-[6px] rounded-[2px] border-l-[#438EF3]"
                : ""
            }`}
          >
            <svg
              className={`${
                !isOpen ? "absolute" : ""
              } text-[22px] h-[26px] w-[26px] mr-2.5 text-[#438EF3]`}
            >
              {link.icon}
            </svg>
            <span className={`text-xs`}>
              {isOpen && <TypewriterText text={link.title} className="" />}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default Menu;
