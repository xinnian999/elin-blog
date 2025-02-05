import { ArticleCard, Card } from "@/components";
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
      <div className="flex-1 overflow-hidden">
        <div className="flex flex-col gap-6 mb-6">
          {data.map((item) => (
            <ArticleCard key={item.id} data={item} />
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

      <div className="w-2/6">
        <Card className="h-60">
          <p>{t("Home Comment Title")}</p>
        </Card>
      </div>
    </div>
  );
}
