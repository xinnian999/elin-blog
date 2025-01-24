"use client";

import { TablePlus } from "@/components";
import { createCategory, fetchCategoryList, updateCategory } from "@/db/service/category";
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
          title: "分类名称",
          dataIndex: "name",
          key: "name",
        },
        {
          title: "分类描述",
          dataIndex: "description",
          key: "description",
        },
        {
          title: "文章数",
          dataIndex: "articleCount",
          key: "articleCount",
        },
      ]}
      api={fetchCategoryList}
      createConfig={{
        title: "新增分类",
        schema: {
          items: [
            {
              name: "name",
              label: "分类名称",
              rules: [{ required: true, message: "请输入分类名称" }],
              component: <Input />,
            },
            
            {
              name: "description",
              label: "分类描述",
              component: <Input.TextArea />,
            },
          ],
        },
        api: createCategory,
      }}
      updateConfig={{
        title: "修改分类",
        schema: {
          items: [
            {
              name: "name",
              label: "分类名称",
              rules: [{ required: true, message: "请输入分类名称" }],
              component: <Input />,
            },
            {
              name: "description",
              label: "分类描述",
              component: <Input.TextArea />,
            },
          ],
        },
        api: updateCategory,
      }}
      // deleteApi={deleteArticle}
    />
  );
};

export default Article;
