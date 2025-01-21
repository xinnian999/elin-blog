import { TablePlus } from "@/components";

const columns= [
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

const Article: React.FC = () => {
  return <TablePlus columns={columns} />;
};

export default Article;
