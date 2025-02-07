import { Card } from "@/components";
import { fetchCategoryList } from "@elin-blog/db";
import { getTranslations } from "next-intl/server";

export default async function Category() {
  const navT = await getTranslations("Nav");

  const categories = await fetchCategoryList();

  return (
    <div className="flex flex-col gap-6">
      <Card title={navT("Nav Category")}>
        <div>
          {categories.map((item) => (
            <button
              key={item.id}
              className="btn text-[14px] mt-2  w-full btn-ghost flex justify-between relative"
            >
              <div className="absolute left-2  w-2 h-2 rounded-full bg-gray-700"></div>{" "}
              <span className="ml-2">{item.name}</span> <span>{item.articleCount}</span>
            </button>
          ))}
        </div>
      </Card>
    </div>
  );
}
