import { TablePlus } from "@/components";
import { Article as ArticleDB, getArticleData } from "@/db";
import { TableProps } from "antd";

const columns: TableProps<ArticleDB>["columns"] = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "文章标题",
    dataIndex: "title",
    key: "title",
  },
  {
    title: "文章内容",
    dataIndex: "content",
    key: "content",
  },
];

const Article: React.FC = async () => {
  const articles = await getArticleData();

  return <TablePlus columns={columns} dataSource={articles} />;
};

export default Article;
