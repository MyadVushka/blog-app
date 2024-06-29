export type CardStyle = {
  [x: string]: any;
  title: string;
  author: string;
  content?: string;
  imageUrl: string;
  id?: number;
};

export type QuoteStyle = {
  [x: string]: any;
  attributes: {
    quoteContent: string;
    quoteAuthor: string;
    quoteImage: {
      data: {
        attributes: {
          url: string;
        };
      };
    };
  };
};
