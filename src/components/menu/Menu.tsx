"use client";
import { LinkType } from "@/types/link.types";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { BiRightArrow } from "react-icons/bi";
import TypewriterText from "../ui/TypeWriterText";
import CollapseSidebar from "../svgs/CollapseSidebar";
import classNames from "classnames";

type MenuProps = {
  links: LinkType[];
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const Menu = ({ isOpen, setIsOpen, links }: MenuProps) => {
  const [activeLink, setActiveLink] = useState<string | null>(null);
  const pathname = usePathname();
  const [subMenuIsOpen, setSubMenuIsOpen] = useState<boolean>(false);

  const toggleSubMenu = (index: number) => {
    setActiveLink(activeLink === index.toString() ? null : index.toString());
  };

  return (
    <ul className="flex flex-col items-start w-full">
      {links.map((link, index) => (
        <li key={index} className="mb-6 w-full" onClick={() => setIsOpen(true)}>
          <div
            className={`w-full flex items-center justify-start h-[40px] text-nowrap cursor-pointer`}
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
                {isOpen && <TypewriterText text={link.title} />}
              </span>
              {link.subLinks && isOpen && (
                <i
                  onClick={() => {
                    if (link.subLinks) {
                      toggleSubMenu(index);
                      setSubMenuIsOpen(!subMenuIsOpen);
                    } else {
                      setIsOpen(true);
                    }
                  }}
                  className={`text-[14px] ml-2.5 text-[#438EF3] ease-in-out cursor-pointer ${
                    subMenuIsOpen
                      ? "rotate-90 transition-transform ease-in-out "
                      : ""
                  }`}
                >
                  <CollapseSidebar color="#438EF3" />
                </i>
              )}
            </Link>
          </div>
          {link.subLinks && activeLink === index.toString() && (
            <ul className="ml-6 mt-2">
              {link.subLinks.map((subLink, subIndex) => (
                <li key={`${index}-${subIndex}`} className="mb-0">
                  <Link
                    href={subLink.href}
                    className={`box-border w-full h-[40px] flex items-center px-6 font-semibold ease-in-out ${
                      pathname === subLink.href
                        ? "bg-[#438ef330] border-l-[6px] rounded-[2px] border-l-[#438EF3]"
                        : ""
                    }`}
                  >
                    <svg
                      className={`text-[18px] h-[22px] w-[22px] mr-2.5 text-[#438EF3]`}
                    >
                      {subLink.icon}
                    </svg>
                    <span className="text-xs">
                      {isOpen && <TypewriterText text={subLink.title} />}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ul>
  );
};

export default Menu;
