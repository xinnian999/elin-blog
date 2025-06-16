import parse from "html-react-parser";
import Image from "next/image";
import anchor from "markdown-it-anchor";
import MarkdownIt from "markdown-it";
import "./style.scss";
import CodeBlock from "../CodeBlock";

async function MdRender({ content }: { content: string }) {
  const md = new MarkdownIt().use(anchor, {
    slugify: (s) => s,
  });

  md.renderer.rules.fence = (tokens, idx) => {
    const token = tokens[idx];
    const lang = token.info.trim();
    const rawCode = token.content;

    return `<pre lang=${lang} code="${rawCode}"></pre>`;
  };

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

          if (domNode.name === "pre") {
            const { lang, code } = domNode.attribs;

            return <CodeBlock lang={lang} code={code.replace(/\n$/, "")} />;
          }
        },
      })}
    </div>
  );
}

export default MdRender;
