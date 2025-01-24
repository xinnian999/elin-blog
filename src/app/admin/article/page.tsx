"use client";

import { Markdown, TablePlus } from "@/components";
import {
  createArticle,
  deleteArticle,
  fetchArticleList,
  updateArticle,
} from "@/db/service/article";
import { fetchCategoryList } from "@/db/service/category";
import { useRequest } from "ahooks";
import { Input, Select } from "antd";

const Article: React.FC = () => {
  const { data: categorys = [] } = useRequest(fetchCategoryList);

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
              name: "content",
              label: "文章内容",
              rules: [{ required: true, message: "请输入文章内容" }],
              component: <Markdown />,
            },
          ],
        },
        api: updateArticle,
        parseInitialValues(values) {
          values.category = values.categoryId;
          return values;
        },
      }}
      deleteApi={deleteArticle}
    />
  );
};

export default Article;
