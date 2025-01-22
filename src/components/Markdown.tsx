"use client";

import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
// import style manually
import "react-markdown-editor-lite/lib/index.css";

interface MarkdownProps {
  value?: string;
  onChange?: (value: string) => void;
}

const Markdown: React.FC<MarkdownProps> = ({ value, onChange = () => {} }) => {
  // 初始化Markdown解析器
  const mdParser = new MarkdownIt(/* Markdown-it options */);

  // 完成！
  function handleEditorChange({ text }) {
    onChange(text);
  }

  return (
    <MdEditor
      style={{ height: "500px" }}
      renderHTML={(text) => mdParser.render(text)}
      onChange={handleEditorChange}
      value={value}
    />
  );
};

export default Markdown;
