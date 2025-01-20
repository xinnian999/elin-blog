"use client";

import { TablePlus } from "@/components";
import { Article as ArticleDB, getArticleData } from "@/db";
import { useAsyncEffect } from "ahooks";
import { Space, TableProps, Tag } from "antd";

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
  {
    title: "Tags",
    key: "tags",
    dataIndex: "tags",
    render: (_) => (
      <>
        <Tag color="#eee"></Tag>
      </>
    ),
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <a>update</a>
        <a>Delete</a>
      </Space>
    ),
  },
];

const Article: React.FC = () => {
  useAsyncEffect(async () => {
    const data = await fetch('/api/article')
    const posts = await data.json()

    console.log(posts)
  }, []);

  return <TablePlus dataSource={[]} columns={columns} />;
};

export default Article;
