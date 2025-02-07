import { Card } from "@/components";
import { fetchTagList } from "@elin-blog/db";
import { getTranslations } from "next-intl/server";

export default async function Tag() {
  const navT = await getTranslations("Nav");

  const tags = await fetchTagList();

  return (
    <div className="flex flex-col gap-6">
      <Card title={navT("Nav Tag")}>
        <div className="flex gap-4 mt-6">
          {tags.map((tag) => {
            return (
              <span className="badge badge-primary badge-lg flex items-center" key={tag.id}>
                {tag.name} <span className="ml-3 text-[14px]">{tag.articleCount}</span> 
              </span>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
