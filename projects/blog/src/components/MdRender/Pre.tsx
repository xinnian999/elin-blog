"use client";
import { useTheme } from "@/hooks";
import { CopyIcon } from "@elin-blog/icons";
import parse from "html-react-parser";
import { useState } from "react";
import { createHighlighter } from "shiki";

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
function Pre({ lang, code }: { lang: string; code: string }) {
  const theme = useTheme();

  const [tip, setTip] = useState(false);

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
    setTip(true);

    setTimeout(() => {
      setTip(false);
    }, 3000);
  };

  return (
    <div className="code-block">
      <button className="btn copy w-10 h-10 p-0" onClick={handleCopy}>
        <CopyIcon className="w-6 h-6" />
      </button>
      {parse(_html)}

      {tip && (
        <div className="toast toast-top toast-center z-30">
          <div className="alert alert-success">
            <span>复制成功！</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default Pre;
