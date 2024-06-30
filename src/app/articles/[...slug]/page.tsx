import styles from "./ArticlePage.module.css";
import Image from "next/image";

const fetchArticleInfo = async (id: string) => {
  try {
    const res = await fetch(
      `http://localhost:1337/api/articles/${id}?populate=*`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.API_KEY}`,
        },

      }
    );

    return await res.json();
  } catch (error) {
    throw error;
  }
};

const ArticlePage = async ({ params }: { params: { slug: string[] } }) => {
  const articleInfo = await fetchArticleInfo(params.slug[0]);

  return (
    <div className={styles.article_wrapper}>
      <div className={styles.image_wrapper}>
        <Image
          className={styles.showcase_image}
          src={`http:localhost:1337${articleInfo.data.attributes.Images.data[0].attributes.url}`}
          width={500}
          height={400}
          alt="showcase-image"
        />
      </div>
      <h1 className={styles.title}>{articleInfo.data.attributes.Title}</h1>
      <p className={styles.author}>{articleInfo.data.attributes.Author}</p>
      <div className={styles.content_wrapper}>
        <p className={styles.content_text}>
          {articleInfo.data.attributes.Content}
        </p>
      </div>
    </div>
  );
};

export default ArticlePage;
