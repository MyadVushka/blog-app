import { ThemeContext } from "@/app/ThemeWrapper";
import styles from "./Modal.module.css";
import Image from "next/image";
import { useContext, useRef } from "react";
import closeIconDark from "../../../public/closeIconDark.svg";
import closeIconLight from "../../../public/closeIconLight.svg";
import debounce from "debounce";

const fetchFilteredArticles = async (title: string) => {
  const res = await fetch(
    `http://localhost:1337/api/articles?filters[Title][$containsi]=${encodeURIComponent(
      title
    )}&populate=*`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.API_KEY}`,
      },
    }
  );

  const data = await res.json();

  return data;
};

const Modal = ({
  setVisibility,
  modalVisibility,
}: {
  setVisibility: () => void;
  modalVisibility: boolean;
}) => {
  const [theme] = useContext(ThemeContext);
  const inputText = useRef(null);

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();

    setVisibility();
  };

  const debounceHandler = debounce(async () => {
    if (inputText.current.value.length > 3) {
      const articles = await fetchFilteredArticles(inputText.current.value);
      console.log(articles);
    }
  }, 500);

  return (
    <div
      onClick={handleClose}
      className={`${styles.modal_wrapper} ${
        modalVisibility ? styles.visible : ""
      }`}
    >
      <div
        onClick={(e: React.MouseEvent) => e.stopPropagation()}
        className={styles.modal_content}
      >
        <button className={styles.button_close} onClick={handleClose}>
          <Image
            src={theme === "dark" ? closeIconLight : closeIconDark}
            width={25}
            height={25}
            alt="close-icon"
          />
        </button>
        <input
          ref={inputText}
          onChange={debounceHandler}
          className={styles.search_input}
          spellCheck="false"
          type="text"
          placeholder="Пошук па назьве"
        />
      </div>
    </div>
  );
};

export default Modal;
