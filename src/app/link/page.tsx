import { LinkStatus } from "@/db";
import ApplyButton from "./ApplyButton";
import { Alert, Card, Comment, CodeBlock } from "@/components";
import Image from "next/image";
import Link from "next/link";
import { stationInfo, stationInfoYaml } from "./config";
import { getCommentRootList, getLinkList } from "@/services";
import { filtersToWhere } from "@/utils";

export default async function LinkPage() {
  const { list } = await getLinkList({
    where: filtersToWhere({
      status: LinkStatus["审核通过"],
    }),
  });

  const { list: commentList } = await getCommentRootList({
    where: {
      type: "link",
    },
    order: {
      id: "desc",
    },
  });

  const randomList = list.sort(() => Math.random() - 0.5);

  return (
    <div className="flex flex-col gap-6">
      <Card title="友情链接">
        <div className="mt-4">
          <Alert>
            本页友链随机排序！
            <br />
            申请友链请点击下方按钮！如果需要修改友联信息，请在下方评论区留言！
            <br />
          </Alert>

          <ApplyButton />

          <div className="divider" />

          <div className="grid grid-cols-3 gap-8">
            {randomList.map((item) => {
              if (!item.url.includes("://")) {
                item.url = "https://" + item.url;
              }
              return (
                <div
                  className="h-20 bg-base-300 rounded-lg flex items-center p-4 gap-4  overflow-hidden"
                  key={item.id}
                >
                  <div className="avatar">
                    <div className="w-14 h-14 rounded-full">
                      <Image src={item.avatar} width={30} height={30} alt="" />
                    </div>
                  </div>

                  <div className="flex-1 flex flex-col gap-2  overflow-hidden">
                    <div className="font-bold text-blue-500 hover:text-blue-700">
                      <Link href={item.url} target="_blank">
                        {item.name}
                      </Link>
                    </div>
                    <div
                      className="text-sm text-ellipsis whitespace-nowrap  overflow-hidden"
                      title={item.desc}
                    >
                      {item.desc}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Card>

      <Card title="本站友链信息">
        <div className="tabs tabs-border">
          <input
            type="radio"
            name="my_tabs_2"
            className="tab"
            aria-label="中文"
            defaultChecked
          />
          <div className="tab-content">
            <CodeBlock lang="yaml" code={stationInfo} />
          </div>

          <input
            type="radio"
            name="my_tabs_2"
            className="tab"
            aria-label="YAML"
          />
          <div className="tab-content">
            <CodeBlock lang="yaml" code={stationInfoYaml} />
          </div>
        </div>
      </Card>

      <Comment type="link" initialData={commentList} />
    </div>
  );
}
