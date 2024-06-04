"use client";
import { FaMoon } from "react-icons/fa";
import { BsSunFill } from "react-icons/bs";

import { useState, useEffect } from "react";
import useThemeContext from "@/contexts/theme.context";

type Props = {};
export const ThemeToggle = ({}: Props) => {
  const [darkMode, setDarkMode] = useState(false);
  const {theme, toggleTheme} = useThemeContext();
  

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme === "dark") {
      setDarkMode(true);
    }
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <div
      className="relative w-12 h-6 flex items-center dark:bg-gray-900 bg-teal-500 cursor-pointer rounded-full p-1"
      onClick={() => { setDarkMode(!darkMode); toggleTheme() }}
    >

      <FaMoon className="text-white" size={18} />
      <div className="absoulte bg-white dark:bg-medium w-6 h-4 rounded-full shadow-md transform transition-transform duration-300"
        style={{ transform: darkMode ? "translateX(15px)" : "translateX(-15px)" }}
      ></div>
      <BsSunFill className="text-yellow-400 ml-auto" size={18} />
    </div>
  );
};
