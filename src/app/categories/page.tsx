import categoryApi from "@/api/category";
import { getT } from "@/async";
import { Card } from "@/components";
import Link from "next/link";

export default async function Categories() {
  const t = await getT();

  const { list } = await categoryApi.getCategoryList({
    pageNum: 1,
    pageSize: 1000,
    orderBys: {
      id: "desc",
    },
  });

  return (
    <div className="flex flex-col gap-6">
      <Card title={t("Nav Category")}>
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
