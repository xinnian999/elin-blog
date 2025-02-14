import { Card, CategoryIcon, ClientImage, TagIcon } from "@/components";
import { fetchArticleById } from "@elin-blog/db";
import MarkdownIt from "markdown-it";
import anchor from "markdown-it-anchor";
import "./style.scss";
import { getDayjs, getTheme } from "@/async";
import { createHighlighter } from "shiki";
import Anchor from "./Anchor";
import parse from "html-react-parser";
import Image from "next/image";

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
  }).use(anchor, {
    slugify: (s) => s,
  });

  const mdContent = parse(md.render(content), {
    // 自定义标签解析
    replace: (domNode: any) => {
      if (domNode.name === "img") {
        // 替换 img 标签为 React 组件
        const { src, alt } = domNode.attribs;
        return (
          <Image
            src={src}
            alt={alt}
            height={300}
            width={250}
            className="w-full"
          />
        );
      }
    },
  });

  // 获取 token
  const tokens = md.parse(content, {});

  const headings = tokens
    .filter((token) => token.type === "heading_open")
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

          <p className="text-2xl mb-6">{title}</p>

          <div className="overflow-hidden w-full" id="md">
            {mdContent}
          </div>
        </Card>
      </div>

      <div className="w-2/6">
        <div>
          <Anchor headings={headings} />
        </div>
      </div>
    </div>
  );
}
