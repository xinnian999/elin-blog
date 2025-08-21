import { ArticleList, Breadcrumb, HomeRightBar } from "@/components";
import articleApi from "@/api/article";
import tagApi from "@/api/tag";

export default async function TagId({
  params,
}: {
  params: Promise<{ tagId: string }>;
}) {
  const tagId = +(await params).tagId;

  const { list } = await articleApi.getArticleList({
    filters: {
      tags: [tagId],
    },
    pageNum: 1,
    pageSize: 1000,
  });

  const tag = await tagApi.getTagById(tagId);

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
