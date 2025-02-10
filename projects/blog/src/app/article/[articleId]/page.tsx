import { Card } from "@/components";
import { fetchArticleById } from "@elin-blog/db";
import MarkdownIt from "markdown-it";
import anchor from "markdown-it-anchor";
import Shiki from "@shikijs/markdown-it";

const md = new MarkdownIt()
  .use(anchor, {
    permalink: anchor.permalink.linkInsideHeader(), // 自动为标题添加链接
  })
  .use(
    await Shiki({
      themes: {
        light: "vitesse-light",
        dark: "vitesse-dark",
      },
    })
  );

export default async function Article({
  params,
}: {
  params: Promise<{ articleId: string }>;
}) {
  const articleId = +(await params).articleId;

  const { content = "", title } = (await fetchArticleById(articleId)) || {};

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
          <p className="text-2xl">{title}</p>

          <div
            className="overflow-hidden w-full "
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
