"use client";

import { current } from "@reduxjs/toolkit";
import { ReactNode, createContext, useState, useEffect } from "react";

export const ThemeContext = createContext(null);
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

  return (
    <div data-theme={currentTheme} className="global-wrapper">
      <ThemeContext.Provider value={[currentTheme, setCurrentTheme]}>
        <div className="content-wrapper">{children}</div>
      </ThemeContext.Provider>
    </div>
  );
};

export default ThemeWrapper;
