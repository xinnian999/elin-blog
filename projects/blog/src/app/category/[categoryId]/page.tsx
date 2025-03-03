import { ArticleList, Breadcrumb, HomeRightBar } from "@/components";
import { fetchArticleByCategory } from "@elin-blog/db";

export default async function CategoryId({
  params,
}: {
  params: Promise<{ categoryId: string }>;
}) {
  const categoryId = +(await params).categoryId;

  const data = await fetchArticleByCategory(categoryId);

  const breadcrumbs = [
    { title: "分类", to: "/categories" },
    { title: data[0].categoryText },
  ];

  return (
    <div className="flex flex-col gap-6 lg:flex-row">
      <div className="flex-1 overflow-hidden">
        <Breadcrumb data={breadcrumbs} />

        <ArticleList list={data} />
      </div>

      <HomeRightBar />
    </div>
  );
}
