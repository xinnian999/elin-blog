import { Card, CategoryIcon, TagIcon } from "@/components";
import { fetchArticleById } from "@elin-blog/db";
import MarkdownIt from "markdown-it";
import anchor from "markdown-it-anchor";
import Shiki from "@shikijs/markdown-it";
import "./style.scss";
import { getDayjs } from "@/async";

export default async function Article({
  params,
}: {
  params: Promise<{ articleId: string }>;
}) {
  const articleId = +(await params).articleId;

  const {
    content = "",
    title,
    created_at,
    categoryText,
    tags = [],
  } = (await fetchArticleById(articleId)) || {};

  const dayjs = await getDayjs();

  const md = new MarkdownIt().use(anchor).use(
    await Shiki({
      theme: "github-dark",
    })
  );

  // 获取 token
  const tokens = md.parse(content, {});
  const headings = tokens
    .filter((token) => token.type === "heading_open")
    .map((token) => {
      // 提取标题级别和文本
      const level = token.tag;
      const title = tokens[tokens.indexOf(token) + 1].content;
      return { level, title };
    });

  return (
    <div className="flex gap-6">
      <div className="flex-1 overflow-hidden">
        <Card>
          <p className="text-xs text-gray-500 flex gap-5  mb-3">
            <span>{dayjs(created_at).fromNow()}发表</span>
            <span className="flex gap-[2px] datas-center">
              <CategoryIcon className="scale-75" /> {categoryText}
            </span>

            <span className="flex gap-3 datas-center">
              {tags.map((tag) => (
                <span key={tag.id} className="flex gap-[2px] datas-center">
                  <TagIcon className="scale-90" /> {tag.name}
                </span>
              ))}
            </span>
          </p>

          <p className="text-2xl mb-6">{title}</p>

          <div
            className="overflow-hidden w-full"
            id="md"
            dangerouslySetInnerHTML={{
              __html: md.render(content),
            }}
          />
        </Card>
      </div>

      <div className="w-2/6">
        <Card className="">
          <p className="text-xs mb-3">目录</p>

          <div className="flex flex-col gap-2">
            {headings.map((item) => {
              if (item.level === "h3") {
                return (
                  <div
                    key={item.title}
                    className="pl-5 text-gray-500 text-[14px] cursor-pointer hover:bg-base-300"
                  >
                    {item.title}
                  </div>
                );
              }
              return <div key={item.title}>{item.title}</div>;
            })}
          </div>
        </Card>
      </div>
    </div>
  );
}
