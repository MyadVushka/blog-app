import "./index";
import QuotesCarousel from "./index";

const fetchQuotes = async () => {
  const res = await fetch("http://localhost:1337/api/quotes?populate=*", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.API_KEY}`,
    },
  });
  const data = await res.json();

  return data;
};

const QuotesWrapper = async () => {
  const quotes = await fetchQuotes();

  return <QuotesCarousel quotes={quotes} />;
};

export default QuotesWrapper;
