import { ArticleList, HomeRightBar } from "@/components";
import { fetchArticleListByPage } from "@elin-blog/db";
import classNames from "classnames";
import Link from "next/link";

export default async function Home() {
  const { data, totalPages } = await fetchArticleListByPage(1, 5);

  return (
    <div className="flex gap-6">
      <div className="flex-1 overflow-hidden">
        <ArticleList list={data} />

        <div className="flex justify-end">
          <div className="join">
            {Array.from({ length: totalPages }).map((_, index) => {
              return (
                <Link href={`/page/${index + 1}`} key={index}>
                  <button
                    className={classNames("join-item btn", {
                      "btn-active": index + 1 === 1,
                      "bg-base-100": index + 1 !== 1,
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
