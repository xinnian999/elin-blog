import { Card } from "@/components";
import { fetchArticleListByPage } from "@/db";
import classNames from "classnames";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import MarkdownIt from "markdown-it";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

const mdParser = new MarkdownIt();

dayjs.extend(relativeTime)

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
            <Card key={item.id}>
              <p>{dayjs(item.created_at).fromNow()}</p>

              <p className="text-2xl link link-hover">
                <Link href={`/article/${item.id}`}>{item.title}</Link>
              </p>

              <div
                className="overflow-hidden w-full max-h-48"
                dangerouslySetInnerHTML={{
                  __html: mdParser.render(item.content),
                }}
              ></div>

              <div>
                <Link href={`/article/${item.id}`}>
                  <button className="btn btn-xs">{t("Read More")}</button>
                </Link>
              </div>
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

      <div className="w-2/6">
        <Card className="h-60" title={t("Home Comment Title")}></Card>
      </div>
    </div>
  );
}
