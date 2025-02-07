"use client";

import { TablePlus } from "@/components";
import { createTag, fetchTagList } from "@elin-blog/db";
import { Input } from "antd";

const Tag: React.FC = () => {
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
          title: "标签名称",
          dataIndex: "name",
          key: "name",
        },
        {
          title: "标签描述",
          dataIndex: "description",
          key: "description",
        },
        {
          title: "文章数",
          dataIndex: "articleCount",
          key: "articleCount",
        },
      ]}
      api={fetchTagList}
      createConfig={{
        title: "新增标签",
        schema: {
          items: [
            {
              name: "name",
              label: "标签名称",
              rules: [{ required: true, message: "请输入标签名称" }],
              component: <Input />,
            },

            {
              name: "description",
              label: "标签描述",
              component: <Input.TextArea />,
            },
          ],
        },
        api: createTag,
      }}
      // updateConfig={{
      //   title: "修改标签",
      //   schema: {
      //     items: [
      //       {
      //         name: "name",
      //         label: "标签名称",
      //         rules: [{ required: true, message: "请输入标签名称" }],
      //         component: <Input />,
      //       },
      //       {
      //         name: "description",
      //         label: "标签描述",
      //         component: <Input.TextArea />,
      //       },
      //     ],
      //   },
      //   api: updateCategory,
      // }}
      // deleteApi={deleteArticle}
    />
  );
};

export default Tag;
