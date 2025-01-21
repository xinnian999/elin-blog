"use client";

import { TablePlus } from "@/components";
import { createArticle, deleteArticle, fetchArticleList } from "@/db/service";
import { Input } from "antd";

const Article: React.FC = () => {
  return (
    <TablePlus
      columns={[
        {
          title: "ID",
          dataIndex: "id",
          key: "id",
          defaultSortOrder: "descend",
          sorter: (a, b) => a.id - b.id,
          width: 120,
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
      ]}
      api={fetchArticleList}
      createConfig={{
        title: "新增文章",
        schema: {
          items: [
            {
              name: "title",
              label: "文章标题",
              rules: [{ required: true, message: "请输入文章标题" }],
              component: <Input />,
            },
            {
              name: "content",
              label: "文章内容",
              rules: [{ required: true, message: "请输入文章内容" }],
              component: <Input.TextArea />,
            },
          ],
        },
        api: createArticle,
      }}
      deleteApi={deleteArticle}
    />
  );
};

export default Article;
