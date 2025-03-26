<template>
  <TablePlus table="article" :columns="columns" schemaId="4" />
</template>

<script setup lang="jsx">
import { ElImage, ElTag } from "element-plus";

const columns = [
  {
    title: "文章海报",
    dataIndex: "picture",
    width: 200,
    render: (record) => {
      const src = record.picture;
      return (
        <ElImage
          preview-src-list={[src]}
          preview-teleported
          src={src}
          style={{ height: "100px" }}
        />
      );
    },
  },
  {
    title: "标题",
    dataIndex: "title",
    search: true,
    width: 300,
  },
  {
    title: "标签",
    dataIndex: "tag",
    search: true,
    width: 150,
    filterKey: "name",
    render: ({ tag }) => {
      return (
        <ul>
          {tag.split(",").map((t) => (
            <li className="tag">
              <ElTag effect="dark" type="info">
                {t}
              </ElTag>
            </li>
          ))}
        </ul>
      );
    },
  },
  {
    title: "阅读次数",
    dataIndex: "visits",
    width: 150,
    sortable: true,
  },
  {
    title: "发布时间",
    width: 200,
    dataIndex: "createTime",
    timeParse: true,
    sortable: true,
  },
  {
    title: "更新时间",
    dataIndex: "updateTime",
    timeParse: true,
    width: 200,
  },
  {
    title: "是否上架",
    dataIndex: "publish",
    fixed: "right",
    switchable: true,
  },
  {
    title: "上架到轮播图",
    dataIndex: "publishBanner",
    fixed: "right",
    width: 120,
    switchable: true,
  },
  {
    title: "是否置顶",
    dataIndex: "topping",
    fixed: "right",
    switchable: true,
  },
];
</script>

<style lang="less">
.tag {
  margin-bottom: 5px;
  list-style: none;
}
</style>
