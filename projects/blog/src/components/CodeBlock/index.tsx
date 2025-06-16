"use client";
import { useMessage, useTheme } from "@/hooks";
import { CopyIcon } from "@/icons";
import parse from "html-react-parser";
import { createHighlighter } from "shiki";
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
    "nginx",
  ],
});

function Pre({
  lang,
  code,
}: {
  lang: string;
  code: string;
}) {
  const message = useMessage();

  const theme = useTheme();

  const _html = highlighter.codeToHtml(code, {
    lang,
    theme: `github-${theme}`,
  });

  const handleCopy = async () => {
    const textArea = document.createElement("textarea");
    textArea.value = code;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);

    message.success("复制成功！");
  };

  return (
    <div className="code-block">
      <button className="btn copy w-10 h-10 p-0" onClick={handleCopy}>
        <CopyIcon className="w-6 h-6" />
      </button>
      {parse(_html)}
    </div>
  );
}

export default Pre;
