import Article from "@/components/article/Article";

export default function ArticlePage({ params }: { params: { slug: number } }) {
  return (
    <main>
      <title>LangImmersion | Czytaj</title>
      <Article articleId={params.slug} />
    </main>
  );
}
