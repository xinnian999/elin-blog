import { Card, CategoryIcon, MdRender, TagIcon } from "@/components";
import { fetchArticleById } from "@elin-blog/db";
import MarkdownIt from "markdown-it";
import { getDayjs } from "@/async";
import Anchor from "./Anchor";

const md = new MarkdownIt();

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

  // 获取 token
  const tokens = md.parse(content, {});

  const headings = tokens
    .filter((token) => token.type === "heading_open" && token.tag !== "h1")
    .map((token, index) => {
      // 提取标题级别和文本
      const level = token.tag;
      const title = tokens[tokens.indexOf(token) + 1].content;
      return { level, title, key: `${index}-${title}` };
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

          <p className="text-[2rem] mb-6">{title}</p>

          <div className="overflow-hidden w-full">
            <MdRender content={content} />
          </div>
        </Card>
      </div>

      <div className="w-2/6">
        <Anchor headings={headings} />
      </div>
    </div>
  );
}
