"use client";
import {
  useEffect,
  useState,
  createContext,
  FC,
  PropsWithChildren,
  useContext,
} from "react";

export type ThemeState = {
  theme: string;
  toggleTheme: () => void;
  sidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  toggleSidebar: () => void;
};

export const ThemeContext = createContext<ThemeState | undefined>(undefined);

export const ThemeProvider: FC<PropsWithChildren> = ({
  children,
}: PropsWithChildren) => {

  const [theme, setTheme] = useState('light');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };



  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme === "dark") {
      setTheme("dark");
    }
  }, []);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, sidebarOpen, toggleSidebar, setSidebarOpen }}>
      {children}
    </ThemeContext.Provider>
  );
};

const useThemeContext = (): ThemeState => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useThemeContext has an error");
  }
  return context;
};

export default useThemeContext;
