import { TablePlus } from "@/components";
import { getArticleData } from "@/db";
import { Tag, Space } from "antd";

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
  }
];

async function Link() {
  const articles = await getArticleData();

  console.log(articles);

  return <TablePlus columns={columns} dataSource={articles.map(item=>({title:item.title}))}/>;
}

export default Link;
