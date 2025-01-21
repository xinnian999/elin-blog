"use client";

import { Markdown, TablePlus } from "@/components";
import { createArticle, deleteArticle, fetchArticleList, updateArticle } from "@/db/service";
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
              component: <Markdown />,
            },
          ],
        },
        api: createArticle,
      }}
      updateConfig={{
        title: "修改文章",
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
              component: <Markdown />,
            },
          ],
        },
        api: updateArticle,
      }}
      deleteApi={deleteArticle}
    />
  );
};

export default Article;
