"use client";

import styles from "./ScrollTopButton.module.css";
import Image from "next/image";
import arrow_top from "../../../public/arrow_top.svg";
import { useState, useEffect } from "react";

const ScrollTopButton = () => {
  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    const toggleVisible = () => {
      const scrolled = document.documentElement.scrollTop;

      if (scrolled > 200) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };
    window.addEventListener("scroll", toggleVisible);
    return () => {
      window.removeEventListener("scroll", toggleVisible);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    visible && (
      <button onClick={scrollToTop} className={styles.button_wrapper}>
        <Image width={25} height={25} alt="scroll-up" src={arrow_top} />
      </button>
    )
  );
};

export default ScrollTopButton;
