import { ArticleList, Breadcrumb, HomeRightBar } from "@/components";
import articleApi from "@/api/article";
import classNames from "classnames";
import Link from "next/link";

export default async function Page({
  params,
}: {
  params: Promise<{ page: string }>;
}) {
  const page = +(await params).page || 1;

  const { list, pageTotal } = await articleApi.getArticleList({
    page,
    pageSize: 5,
  });

  return (
    <div className="flex flex-col gap-6 lg:flex-row">
      <div className="flex-1 overflow-hidden">
        <Breadcrumb
          data={[{ title: `首页`, to: "/" }, { title: `第 ${page} 页` }]}
        />

        <ArticleList list={list} />

        <div className="flex justify-end">
          <div className="join">
            {Array.from({ length: pageTotal }).map((_, index) => {
              return (
                <Link href={`/page/${index + 1}`} key={index}>
                  <button
                    className={classNames("join-item btn", {
                      "btn-primary": index + 1 === page,
                      "bg-base": index + 1 !== page,
                    })}
                  >
                    {index + 1}
                  </button>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      <HomeRightBar />
    </div>
  );
}
