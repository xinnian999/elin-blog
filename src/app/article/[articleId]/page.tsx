import MarkdownIt from "markdown-it";
import { getDayjs } from "@/async";
import Anchor from "./Anchor";
import Relate from "./Relate";
import { Affix } from "antd";
import { Card, Comment, MdRender } from "@/components";
import { CategoryIcon, TagIcon } from "@/icons";
// import articleApi from "@/api/article";
import commentApi from "@/api/comment";
import { getArticleById } from "@/services";

const md = new MarkdownIt({
  html: true, // 允许 HTML
  linkify: true, // 自动转换链接
  typographer: true, // 启用排版功能
});

export default async function Article({
  params,
}: {
  params: Promise<{ articleId: string }>;
}) {
  const articleId = +(await params).articleId;

  const { article, relates } = await getArticleById(articleId);

  if (!article) {
    return <Card className="text-center">文章不存在</Card>;
  }

  const { content = "", title, created_at, categoryText, tags = [] } = article;

  const { list: commentList } = await commentApi.getCommentRootList({
    filters: { type: "article", articleId },
    orderBys: { id: "desc" },
  });

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

          <p className="text-[2rem] font-bold mb-4">{title}</p>

          <div className="overflow-hidden w-full">
            <MdRender content={content} />
          </div>
        </Card>

        <Comment
          type="article"
          articleId={articleId}
          initialData={commentList}
          className="mt-6"
        />
      </div>

      <div className="w-2/6 hidden lg:block">
        <Affix offsetTop={100}>
          <div>
            <Anchor headings={headings} />
            <Relate list={relates} />
          </div>
        </Affix>
      </div>
    </div>
  );
}
