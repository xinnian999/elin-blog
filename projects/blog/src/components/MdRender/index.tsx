import { getTheme } from "@/async";
import { createHighlighter } from "shiki";
import parse from "html-react-parser";
import Image from "next/image";
import anchor from "markdown-it-anchor";
import MarkdownIt from "markdown-it";
import "./style.scss";

const highlighter = await createHighlighter({
  themes: ["github-dark", "github-light"],
  langs: [
    "javascript",
    "ts",
    "json",
    "css",
    "vue",
    "java",
    "bash",
    "docker",
    "yaml",
    "nginx"
  ],
});

async function MdRender({ content }: { content: string }) {
  const theme = await getTheme();

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

  return (
    <div id="md">
      {parse(md.render(content), {
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
      })}
    </div>
  );
}

export default MdRender;
