import { Card } from "@/components";
import tagApi from "@/api/tag";
import Link from "next/link";
import { getT } from "@/async";

export default async function Tag() {
  const t = await getT();

  const { list } = await tagApi.getTagList({
    orderBys: {
      id: "desc",
    },
    pageNum: 1,
    pageSize: 1000,
  });

  return (
    <div className="flex flex-col gap-6">
      <Card title={t("Nav Tag")}>
        <div className="flex gap-4 mt-6 flex-wrap">
          {list.map((tag) => {
            return (
              <Link href={`/tag/${tag.id}`} key={tag.id}>
                <span className="badge badge-primary badge-lg flex items-center">
                  {tag.name}{" "}
                  <span className="ml-3 text-[14px]">{tag.articleCount}</span>
                </span>
              </Link>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
