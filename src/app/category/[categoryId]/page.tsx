import { ArticleList, Breadcrumb, Card, HomeRightBar } from "@/components";
import { getArticleList, getCategoryById } from "@/services";
import { filtersToWhere } from "@/utils";

export default async function CategoryId({
  params,
}: {
  params: Promise<{ categoryId: string }>;
}) {
  const categoryId = +(await params).categoryId;

  const { list } = await getArticleList({
    pageNum: 1,
    pageSize: 1000,
    where: filtersToWhere({
      category: categoryId,
    }),
  });

  const category = await getCategoryById(categoryId);

  if (!category) {
    return <Card>分类不存在</Card>;
  }

  const breadcrumbs = [
    { title: "分类", to: "/categories" },
    { title: category.name },
  ];

  return (
    <div className="flex flex-col gap-6 lg:flex-row">
      <div className="flex-1 overflow-hidden">
        <Breadcrumb data={breadcrumbs} />

        <ArticleList list={list} />
      </div>

      <HomeRightBar />
    </div>
  );
}
