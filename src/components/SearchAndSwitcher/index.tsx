"use client";

import styles from "./SearchAndSwitcher.module.css";
import magnifier from "../../../public/mangifier.svg";
import magnifierLight from "../../../public/mangifierLight.svg";
import Image from "next/image";
import { useContext, useState } from "react";
import { ThemeContext } from "@/components/Contexts/ThemeWrapper";
import ThemeToggle from "../ThemeToggle";
import Modal from "@/layouts/ModalScreen";

const SearchAndSwitcher = () => {
  const [theme] = useContext(ThemeContext);
  const [modalVisibility, setModalVisibility] = useState<boolean>(false);

  const handleChangeVisibility = () => {
    setModalVisibility((prev) => !prev);
  };

  return (
    <>
      <Modal
        setVisibility={handleChangeVisibility}
        modalVisibility={modalVisibility}
      />
      <div className={styles.additional_wrapper}>
        <button
          onClick={handleChangeVisibility}
          className={styles.search_wrapper}
        >
          <Image
            src={theme === "light" ? magnifier : magnifierLight}
            alt="magnifier"
            width={25}
            height={25}
          />
          <div className={`${styles.search_block}`}>
            <span>Пошук</span>
          </div>
        </button>
        <ThemeToggle />
      </div>
    </>
  );
};

export default SearchAndSwitcher;
