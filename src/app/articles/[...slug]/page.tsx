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
        cache: "no-store",
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
          src={`http://localhost:1337${articleInfo.data.attributes.Images.data[0].attributes.url}`}
          width={500}
          height={400}
          alt="showcase-image"
        />
      </div>
      <h1 className={styles.title}>{articleInfo.data.attributes.Title}</h1>
      <p className={styles.author}>
        <i>{articleInfo.data.attributes.Author}</i>
      </p>
      <div className={styles.content_wrapper}>
        {articleInfo.data.attributes.Content &&
        articleInfo.data.attributes.Content.length ? (
          <p className={styles.content_text}>
            {articleInfo.data.attributes.Content.map(
              (contentBlock: any, index: number) =>
                contentBlock.children.map((child: any, idx: number) => {
                  if (child.type === "list-item") {
                    return (
                      <li className={styles.list_item} key={idx}>
                        {child.children[0].text}
                      </li>
                    );
                  }
                  if (child.italic) {
                    return <i key={idx}>{child.text}</i>;
                  }
                  if (child.bold) {
                    return <b key={idx}>{child.text}</b>;
                  }
                  if (!child.text.length) {
                    return <br key={idx} />;
                  }
                  return <span key={idx}>{child.text}</span>;
                })
            )}
          </p>
        ) : null}
      </div>
      {articleInfo.data.attributes.Sources &&
      articleInfo.data.attributes.Sources.length ? (
        <>
          <p>Крыніцы:</p>
          <ul className={styles.sources}>
            {articleInfo.data.attributes.Sources.map((source: any) => (
              <li key={source.id}>
                <i>{source.children[0].text}</i>
              </li>
            ))}
          </ul>
        </>
      ) : null}
    </div>
  );
};

export default ArticlePage;
