const ArticlePage = ({ params }: { params: { slug: string } }) => {
  let transliteratedTitle: string = params.slug;

  return (
    <div className="">
      <div className="">{transliteratedTitle}</div>
    </div>
  );
};

export default ArticlePage;
