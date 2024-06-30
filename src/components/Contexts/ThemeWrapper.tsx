"use client";

import {
  ReactNode,
  createContext,
  useState,
  useEffect,
  useMemo,
  SetStateAction,
  Dispatch,
} from "react";

export const ThemeContext = createContext<
  (string | Dispatch<SetStateAction<string>>)[]
>([]);
const ThemeWrapper = ({ children }: { children: ReactNode }) => {
  const [currentTheme, setCurrentTheme] = useState(() => {
    if (typeof window !== undefined) {
      return localStorage.getItem("theme") || "light";
    }
    return "light";
  });

  useEffect(() => {
    if (typeof window !== undefined) {
      localStorage.setItem("theme", currentTheme);
    }
  }, [currentTheme]);

  const themeValue = useMemo(
    () => [currentTheme, setCurrentTheme],
    [currentTheme]
  );

  return (
    <div data-theme={currentTheme} className="global-wrapper">
      <ThemeContext.Provider value={themeValue}>
        <div className="content-wrapper">{children}</div>
      </ThemeContext.Provider>
    </div>
  );
};

export default ThemeWrapper;
