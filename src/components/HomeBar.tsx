import { Card } from "@/components";
import { fetchArticleListByPage } from "@/db";
import classNames from "classnames";
import { getTranslations } from "next-intl/server";
import Link from "next/link";

export default async function HomeBar({
  params,
}: {
  params: Promise<{ page: string }>;
}) {
  const page = +(await params).page || 1;

  const { data, totalPages } = await fetchArticleListByPage(page, 10);

  const t = await getTranslations("Home");

  return (
    <div className="flex gap-6">
      <div className="basis-2/3 flex-grow">
        <div className="flex flex-col gap-6 mb-6">
          {data.map((item) => (
            <Card key={item.id}>
              <p className="text-2xl">{item.title}</p>

              <div className="line-clamp-5">{item.content}</div>
            </Card>
          ))}
        </div>

        <div className="join">
          {Array.from({ length: totalPages }).map((_, index) => {
            return (
              <Link href={`/page/${index + 1}`} key={index}>
                <button
                  className={classNames("join-item btn", {
                    "btn-active": index + 1 === page,
                  })}
                >
                  {index + 1}
                </button>
              </Link>
            );
          })}
        </div>
      </div>

      <div className="basis-1/3 flex-grow">
        <Card className="h-60" title={t("Home Comment Title")}></Card>
      </div>
    </div>
  );
}
