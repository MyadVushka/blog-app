"use client";

import styles from "./ScrollTopButton.module.css";
import Image from "next/image";
import arrow_top from "../../../public/arrow_top.svg";
import { useState } from "react";

const ScrollTopButton = () => {
  const [visible, setVisible] = useState<boolean>(false);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;

    if (scrolled > 200) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  };

  window.addEventListener("scroll", toggleVisible);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    visible && (
      <div className={styles.button_wrapper}>
        <Image
          onClick={scrollToTop}
          width={25}
          height={25}
          alt="scroll-up"
          src={arrow_top}
        />
      </div>
    )
  );
};

export default ScrollTopButton;
