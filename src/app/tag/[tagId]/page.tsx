import { ArticleList, Breadcrumb, Card, HomeRightBar } from "@/components";
import { getArticleList, getTagById } from "@/services";
import { filtersToWhere } from "@/utils";

export default async function TagId({
  params,
}: {
  params: Promise<{ tagId: string }>;
}) {
  const tagId = +(await params).tagId;

  const { list } = await getArticleList({
    pageNum: 1,
    pageSize: 1000,
    where: filtersToWhere({
      tags: [tagId],
    }),
  });

  const tag = await getTagById(tagId);

  if (!tag) {
    return <Card>标签不存在</Card>;
  }

  const breadcrumbs = [{ title: "标签", to: "/tags" }, { title: tag.name }];

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
