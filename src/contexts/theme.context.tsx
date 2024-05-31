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
};

export const ThemeContext = createContext<ThemeState | undefined>(undefined);

export const ThemeProvider: FC<PropsWithChildren> = ({
  children,
}: PropsWithChildren) => {

  const getTheme = () => {
    const theme = localStorage.getItem("theme");
    if (theme === "dark") {
      return "dark";
    } else {
      return "light";
    }
  };

  const [theme, setTheme] = useState(getTheme);

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
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
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
