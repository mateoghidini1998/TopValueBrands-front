"use client";
import Menu from "../menu/Menu";
import useAuthContext from "@/contexts/auth.context";
import { LINKS } from "../../constants/links";
import { useEffect, useState } from "react";
import CollapseSidebar from "../svgs/CollapseSidebar";
import useThemeContext from "@/contexts/theme.context";
import TypewriterText from "../ui/TypeWriterText";

const Navbar = () => {
  const { user } = useAuthContext();
  const { sidebarOpen, toggleSidebar, setSidebarOpen } = useThemeContext();
  const { theme } = useThemeContext();
  const [color, setColor] = useState(theme === "dark" ? "#fff" : "#000");

  useEffect(() => {
    setColor(theme === "dark" ? "#fff" : "#000");
  }, [theme]);

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

    if (!sidebarOpen && mainLayout) {
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
  }, [sidebarOpen]);

  return (
    <nav
      className={`
      bg-white dark:bg-dark dark:text-white z-50
      ${
        sidebarOpen
          ? "w-[16rem] duration-[0.6s] ease-in-out "
          : "w-[3.75rem] duration-[0.6s] ease-in-out "
      } min-h-screen flex flex-col border-r-[1px] dark:border-r-dark-2 border-r-[#EFF1F3] text-black box-border fixed`}
    >
      <div className="text-lg font-bold px-12 pb-[30px] mb-[20px] pt-9 text-center h-[110px] text-nowrap">
        {sidebarOpen && <TypewriterText text="Top Value Brands" className="" />}
      </div>
      {/* Logo */}

      {/* Nav Items */}
      <div className="flex flex-col items-center w-full">
        <Menu
          isOpen={sidebarOpen}
          setIsOpen={setSidebarOpen}
          links={filteredLinks}
        />
      </div>

      {/* Toggle Nav */}
      {/* center the button on axis X */}

      <div
        className={`bottom_buttons absolute w-full h-[100px] bottom-4 flex justify-between px-4 items-center ${
          !sidebarOpen && "flex-row"
        }`}
      >
        {/* <div className="bottom-4 left-4">
        </div> */}
        <button
          onClick={() => {
            toggleSidebar();
          }}
          className={`bottom-4 right-4 ${
            !sidebarOpen
              ? "rotate-180 duration-[0.6s] ease-in-out"
              : "rotate-[-180] duration-[0.6s] ease-in-out"
          }`}
        >
          <CollapseSidebar color={color} />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
