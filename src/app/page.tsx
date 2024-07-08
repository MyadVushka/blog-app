import CardArticle from "@/components/CardArticle";
import styles from "./page.module.css";
import { CardStyle } from "@/types/general";
import QuotesWrapper from "@/components/QuotesCarousel/QuotesWrapper";
const fetchArticles = async () => {
  try {
    const res = await fetch("http://localhost:1337/api/articles?populate=*", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.API_KEY}`,
      },
      cache: "no-store",
    });

    const data = await res.json();

    return data;
  } catch (error) {
    throw error;
  }
};

const Home = async () => {
  const articles = await fetchArticles();

  return (
    <div className={styles.homepage_wrapper}>
      <QuotesWrapper />
      <ul className={styles.card_list}>
        {Boolean(articles.data.length) &&
          articles.data
            .map((article: CardStyle) => (
              <CardArticle
                key={article.id}
                id={article.id}
                title={article.attributes.Title}
                author={article.attributes.Author}
                imageUrl={
                  `http://localhost:1337` +
                  article.attributes.Images.data[0].attributes.url
                }
              />
            ))
            .reverse()}
      </ul>
    </div>
  );
};

export default Home;
