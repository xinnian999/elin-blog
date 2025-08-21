import { ArticleList, Breadcrumb, HomeRightBar } from "@/components";
import articleApi from "@/api/article";
import categoryApi from "@/api/category";

export default async function CategoryId({
  params,
}: {
  params: Promise<{ categoryId: string }>;
}) {
  const categoryId = +(await params).categoryId;

  const { list } = await articleApi.getArticleList({
    filters: {
      category: categoryId,
    },
    pageNum: 1,
    pageSize: 1000,
  });

  const category = await categoryApi.getCategoryById(categoryId);

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
