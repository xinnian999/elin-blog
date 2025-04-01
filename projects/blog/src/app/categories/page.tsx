import { fetchList } from "@/async";
import { Card } from "@/components";
import { Category } from "@/db";
import { getTranslations } from "next-intl/server";
import Link from "next/link";

export default async function Categories() {
  const navT = await getTranslations("Nav");

  const { list } = await fetchList<Category>("/category", {
    pageNum: 1,
    pageSize: 100,
    orderBys: {
      id: "desc",
    },
  });

  return (
    <div className="flex flex-col gap-6">
      <Card title={navT("Nav Category")}>
        {list.map((item) => (
          <Link href={`/category/${item.id}`} key={item.id}>
            <div className="text-[14px] mt-2 w-full flex justify-between relative items-center p-4 cursor-pointer rounded hover:bg-base-200">
              <div className="absolute left-2  w-2 h-2 rounded-full bg-gray-700"></div>{" "}
              <span className="ml-2">{item.name}</span>{" "}
              <span className="bg-base-200 px-3 rounded">
                {item.articleCount}
              </span>
            </div>
          </Link>
        ))}
      </Card>
    </div>
  );
}
