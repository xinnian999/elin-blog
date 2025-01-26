import { Card } from "@/components";
import { fetchTagList } from "@/db/service/tag";
import { getTranslations } from "next-intl/server";

export default async function Tag() {
  const navT = await getTranslations("Nav");

  const tags = await fetchTagList();

  return (
    <div className="flex flex-col gap-6">
      <Card title={navT("Nav Tag")}>
        <div className="flex gap-4">
          {tags.map((tag) => {
            return (
              <span className="badge badge-primary" key={tag.id}>
                {tag.name}
              </span>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
