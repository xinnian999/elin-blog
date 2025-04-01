import { ArticleList, Breadcrumb, HomeRightBar } from "@/components";
import { fetchArticleByTag } from "@/db";

export default async function TagId({
  params,
}: {
  params: Promise<{ tagId: string }>;
}) {
  const tagId = +(await params).tagId;

  const data = await fetchArticleByTag(tagId);

  const breadcrumbs = [
    { title: "标签", to: "/tags" },
    { title: data[0].tags.find(item=>item.id===tagId)!.name},
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
