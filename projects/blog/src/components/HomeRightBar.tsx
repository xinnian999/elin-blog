import { getDayjs, getT } from "@/async";
import { Card } from "@/components";
import commentApi from "@/api/comment";
import classNames from "classnames";
import Link from "next/link";
import linkApi from "@/api/link";

export default async function HomeRightBar() {
  const t = await getT();

  const { list: comments } = await commentApi.getCommentRootList({
    filters: { type: "comment" },
    orderBys: { id: "desc" },
  });

  const { list: links } = await linkApi.getLinkList({
    filters: { status: 2 },
    orderBys: { id: "desc" },
  });

  const randomLinks = links.sort(() => Math.random() - 0.5);

  const dayjs = await getDayjs();

  return (
    <div className="lg:w-2/6">
      <Card className="">
        <p className="text-xs">{t("Home Comment Title")}</p>

        <div className="flex flex-col gap-5 mt-4">
          {comments.map((item) => {
            return (
              <div key={item.id}>
                <div>{item.content}</div>
                <div className="text-[12px] text-gray-500">
                  {item.nickname} / {dayjs(item.created_at).fromNow()}
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      <Card className="mt-4">
        <p className="text-xs">友情链接</p>

        <div className="flex flex-wrap gap-5 mt-4">
          {randomLinks.map((item) => {
            return (
              <Link href={item.url} key={item.id} target="_blank">
                <button className={classNames("btn-xs btn")}>
                  {item.name}
                </button>
              </Link>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
