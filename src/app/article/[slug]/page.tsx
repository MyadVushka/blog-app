const ArticlePage = ({ params }: { params: { slug: string } }) => {

  return (
    <div className="">
      <div className="">{params.slug}</div>
    </div>
  );
};

export default ArticlePage;
