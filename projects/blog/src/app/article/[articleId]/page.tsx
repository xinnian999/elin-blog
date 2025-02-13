import { Card, CategoryIcon, TagIcon } from "@/components";
import { fetchArticleById } from "@elin-blog/db";
import MarkdownIt from "markdown-it";
import anchor from "markdown-it-anchor";
import "./style.scss";
import { getDayjs, getTheme } from "@/async";
import { createHighlighter } from "shiki";

const highlighter = await createHighlighter({
  themes: ["github-dark", "github-light"],
  langs: ["javascript", "ts", "json", "css"],
});

export default async function Article({
  params,
}: {
  params: Promise<{ articleId: string }>;
}) {
  const articleId = +(await params).articleId;

  const theme = await getTheme();

  const {
    content = "",
    title,
    created_at,
    categoryText,
    tags = [],
  } = (await fetchArticleById(articleId)) || {};

  const dayjs = await getDayjs();

  const md = new MarkdownIt({
    highlight: (str, lang) => {
      if (lang) {
        return highlighter.codeToHtml(str, {
          lang,
          theme: `github-${theme}`,
        });
      }
      return ""; // 默认返回空字符串
    },
  }).use(anchor);

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
