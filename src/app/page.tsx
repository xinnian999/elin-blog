import { ArticleList, HomeRightBar } from "@/components";
import { getArticleList } from "@/services";
import classNames from "classnames";
import Link from "next/link";


export default async function Home() {
  const { list, pageTotal } = await getArticleList({
    pageNum: 1,
    pageSize: 5,
    order: {
      id: "desc",
    },
  });

  return (
    <div className="flex flex-col gap-6 lg:flex-row">
      <div className="flex-1 overflow-hidden">
        <ArticleList list={list} />

        <div className="flex justify-end">
          <div className="join">
            {Array.from({ length: pageTotal }).map((_, index) => {
              return (
                <Link href={`/page/${index + 1}`} key={index}>
                  <button
                    className={classNames("join-item btn", {
                      "btn-primary": index + 1 === 1,
                      "bg-base": index + 1 !== 1,
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
