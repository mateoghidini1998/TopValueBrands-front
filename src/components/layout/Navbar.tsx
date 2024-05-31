"use client";
import Menu from "../menu/Menu";
import useAuthContext from "@/contexts/auth.context";
import { LINKS } from "../../constants/links";
import { useEffect, useState } from "react";

const Navbar = () => {
  const { user } = useAuthContext();
  const [isOpen, setIsOpen] = useState(true);

  const filteredLinks = LINKS.filter((link) => {
    if (
      !user ||
      (user.role !== "admin" &&
        (link.title === "Users" ||
          link.title === "Inventory Management" ||
          link.title === "PO Generator"))
    ) {
      return false;
    }
    return true;
  });

  useEffect(() => {
    const mainLayout = document.querySelector(".main_layout");
    const tableHeader = document.querySelector(".table_header");
    const inventoryTableHeader = document.querySelector(
      ".inventory_table_header"
    );

    if (!isOpen && mainLayout) {
      // Si el sidebar está abierto y mainLayout no es null, añade una clase para ajustar los estilos
      mainLayout.classList.add("navbar-closed");
      if (tableHeader) tableHeader.classList.add("navbar-closed");
      if (inventoryTableHeader)
        inventoryTableHeader.classList.add("navbar-closed");
    } else {
      // Si el sidebar está cerrado o alguno de los elementos es null, quita la clase para ajustar los estilos
      if (mainLayout) mainLayout.classList.remove("navbar-closed");
      if (tableHeader) tableHeader.classList.remove("navbar-closed");
      if (inventoryTableHeader) {
        inventoryTableHeader.classList.remove("navbar-closed");
      }
    }
  }, [isOpen]);

  return (
    <nav
      className={`
      bg-white dark:bg-dark dark:text-white z-[1000]
      ${
        isOpen ? "w-[275px]" : "w-[60px]"
      } min-h-screen flex flex-col border-r-[1px] dark:border-r-dark-2 border-r-[#EFF1F3] text-black box-border fixed`}
    >
      <div className="text-lg font-bold px-12 pb-[70px] pt-9 text-center h-[110px]">
        <h1 className={` ${!isOpen ? "hidden" : ""}`}>Top Value Brands</h1>
      </div>
      {/* Logo */}

      {/* Nav Items */}
      <div className="flex flex-col items-center w-full">
        <Menu isOpen={isOpen} setIsOpen={setIsOpen} links={filteredLinks} />
      </div>

      {/* Toggle Nav */}
      {/* center the button on axis X */}

      <div className={`bottom_buttons absolute w-full h-[100px] bottom-4 flex justify-between px-4 items-center ${!isOpen ? "flex-col" : "flex-row"}`}>
        <div className="bottom-4 left-4">
        </div>
        <button className="bottom-4 right-4">
          <svg
            onClick={() => setIsOpen(!isOpen)}
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
