"use client";

import { CardStyle } from "@/types/general";
import styles from "./CardArticle.module.css";
import Image from "next/image";
import { useRouter } from "next/navigation";

const CardArticle = (props: CardStyle) => {
  const router = useRouter();

  const handleClick = () => {
    const title = props.title.replace(/ /g, "_");
    router.push(`/article/${title}`);
  };

  return (
    <div onClick={handleClick} className={styles.card_wrapper}>
      <Image
        className={styles.image}
        src={props.imageUrl}
        width={385}
        height={180}
        alt="image"
      />
      <div className={styles.info}>
        <h2 className={styles.title}>{props.title}</h2>
        <p className={styles.author}>{props.author}</p>
      </div>
    </div>
  );
};

export default CardArticle;
