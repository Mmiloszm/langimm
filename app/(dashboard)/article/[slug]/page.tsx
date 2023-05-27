import Article from "@/components/article/Article";

export default function ArticlePage({ params }: { params: { slug: number } }) {
  return (
    <main>
      <Article articleId={params.slug} />
    </main>
  );
}
