"use client";

import styles from "./SearchAndSwitcher.module.css";
import magnifier from "../../../public/mangifier.svg";
import magnifierLight from "../../../public/mangifierLight.svg";
import { useState } from "react";
import Image from "next/image";
import { useContext } from "react";
import { ThemeContext } from "@/app/ThemeWrapper";
import ThemeToggle from "../ThemeToggle";

const SearchAndSwitcher = () => {
  const [theme] = useContext(ThemeContext);
  const [isMouseOver, setIsMouseOver] = useState<boolean>(false);

  const handleMouseOver = () => {
    setIsMouseOver(true);
  };

  const handleMouseLeave = () => {
    setIsMouseOver(false);
  };

  return (
    <div className={styles.additional_wrapper}>
      <button
        onMouseOver={handleMouseOver}
        onMouseLeave={handleMouseLeave}
        className={styles.search_wrapper}
      >
        <Image
          src={theme === "light" ? magnifier : magnifierLight}
          alt="magnifier"
          width={25}
          height={25}
        />
        <div
          className={`${styles.search_block} ${
            isMouseOver ? styles.active : ""
          }`}
        >
          <span>Пошук</span>
        </div>
      </button>
      <ThemeToggle />
    </div>
  );
};

export default SearchAndSwitcher;
