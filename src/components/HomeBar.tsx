import { getDayjs } from "@/async";
import { ArticleCard, Card } from "@/components";
import { fetchArticleListByPage } from "@/db";
import { fetchHomeCommentList } from "@/db/service/comment";
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
  
  const comments = await fetchHomeCommentList();

  const dayjs = await getDayjs();

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
        <Card className="">
          <p>{t("Home Comment Title")}</p>

          <div className="flex flex-col gap-5 mt-4">
            {comments.map(item=>{
              return <div key={item.id}>
                <div>{item.content}</div>
                <div className="text-[12px] text-gray-500">{item.nickname} / {dayjs(item.created_at).fromNow()}</div>
              </div>
            })}
          </div>
        </Card>
      </div>
    </div>
  );
}
