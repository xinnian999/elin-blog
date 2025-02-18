import { Card } from "@/components";
import { fetchCategoryList } from "@elin-blog/db";
import { getTranslations } from "next-intl/server";

export default async function Category() {
  const navT = await getTranslations("Nav");

  const categories = await fetchCategoryList();

  return (
    <div className="flex flex-col gap-6">
      <Card title={navT("Nav Category")}>
          {categories.map((item) => (
            <div
              key={item.id}
              className="text-[14px] mt-2 w-full flex justify-between relative items-center p-4 cursor-pointer rounded hover:bg-base-200"
            >
              <div className="absolute left-2  w-2 h-2 rounded-full bg-gray-700"></div>{" "}
              <span className="ml-2">{item.name}</span> <span className="bg-base-200 px-3 rounded">{item.articleCount}</span>
            </div>
          ))}
      </Card>
    </div>
  );
}
