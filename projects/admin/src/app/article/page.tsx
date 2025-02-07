"use client";

import { Markdown, TablePlus } from "@/components";
import { Tag } from "@elin-blog/db";
import {
  createArticle,
  deleteArticle,
  fetchArticleList,
  updateArticle,
  fetchCategoryList,
  fetchTagList
} from "@elin-blog/db";
import { useRequest } from "ahooks";
import { Input, Select, Space, Tag as AntdTag } from "antd";

const Article: React.FC = () => {
  const { data: categorys = [] } = useRequest(fetchCategoryList);
  const { data: tags = [] } = useRequest(fetchTagList);

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
          title: "所属分类",
          dataIndex: "categoryText",
          key: "categoryText",
        },
        {
          title: "标签",
          dataIndex: "tagTexts",
          key: "tagTexts",
          render: (val) => {
            return (
              <Space>
                {val.map((tag: string) => (
                  <AntdTag key={tag}>{tag}</AntdTag>
                ))}
              </Space>
            );
          },
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
              name: "category",
              label: "所属分类",
              rules: [{ required: true, message: "请选择分类" }],
              component: (
                <Select
                  options={categorys}
                  fieldNames={{ label: "name", value: "id" }}
                  style={{ width: "200px" }}
                />
              ),
            },
            {
              name: "tags",
              label: "标签",
              rules: [{ required: true, message: "请选择标签" }],
              component: (
                <Select
                  options={tags}
                  fieldNames={{ label: "name", value: "id" }}
                  style={{ width: "200px" }}
                  mode="multiple"
                />
              ),
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
              name: "category",
              label: "所属分类",
              rules: [{ required: true, message: "请选择分类" }],
              component: (
                <Select
                  options={categorys}
                  fieldNames={{ label: "name", value: "id" }}
                  style={{ width: "200px" }}
                />
              ),
            },
            {
              name: "tags",
              label: "标签",
              rules: [{ required: true, message: "请选择标签" }],
              component: (
                <Select
                  options={tags}
                  fieldNames={{ label: "name", value: "id" }}
                  style={{ width: "200px" }}
                  mode="multiple"
                />
              ),
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
        parseInitialValues(values) {
          return {
            ...values,
            category: values.categoryId,
            tags: values.tags.map((item: Tag) => item.id),
          };
        },
      }}
      deleteApi={deleteArticle}
    />
  );
};

export default Article;
