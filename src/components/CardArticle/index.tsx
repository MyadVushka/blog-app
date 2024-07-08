"use client";

import { CardStyle } from "@/types/general";
import styles from "./CardArticle.module.css";
import Image from "next/image";
import { useRouter } from "next/navigation";
import slugify from "slugify";

slugify.extend({ ў: "w" });
slugify.extend({ Ў: "W" });
slugify.extend({ в: "v" });
slugify.extend({ В: "V" });

const CardArticle = (props: CardStyle) => {
  const router = useRouter();

  const handleClick = () => {
    const slugifiedTitle = slugify(props.title, {
      lower: true,
      strict: true,
      replacement: "-",
      locale: "be",
    });
    router.push(`/articles/${props.id}/${slugifiedTitle}`);
  };

  return (
    <div onClick={handleClick} className={ `${styles.card_wrapper} roboto-font`}>
      <Image
        className={styles.image}
        src={props.imageUrl}
        width={385}
        height={180}
        alt="article-image"
      />
      <div className={styles.info}>
        <h2 className={styles.title}>{props.title}</h2>
        <p className={styles.author}>{props.author}</p>
      </div>
    </div>
  );
};

export default CardArticle;
