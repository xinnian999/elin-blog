import { ArticleCard } from "@/components";
import { Article } from "@/db";

export default async function ArticleList({ list }: { list: Article[] }) {
  return (
    <div className="flex flex-col gap-6 mb-6">
      {list.map((item) => (
        <ArticleCard key={item.id} data={item} />
      ))}
    </div>
  );
}
