<template>
  <TablePlus
    table="category"
    :defaultSort="{ prop: 'id', order: 'descending' }"
    :columns="columns"
    :formData="formData"
  />
</template>

<script setup lang="jsx">
import { Tickets } from "@element-plus/icons-vue";

const belongData = [
  { name: "文章", value: "article" },
  { name: "笔记", value: "note" },
  { name: "作品", value: "works" },
];

const columns = [
  {
    title: "名称",
    dataIndex: "name",
  },
  {
    title: "归属表",
    dataIndex: "belong",
    render: ({ belong }) => {
      const list = belong.split(",");
      return (
        <ul>
          {list.map((item) => {
            const name = belongData.find((v) => v.value === item).name;
            return (
              <li class="tag">
                <IconTag icon={Tickets}>{name}</IconTag>
              </li>
            );
          })}
        </ul>
      );
    },
  },
];

const formData = [
  {
    label: "名称",
    value: "name",
    component: "input",
    required: true,
  },
  {
    label: "归属表",
    value: "belong",
    component: "select",
    multiple: true,
    required: true,
    selectData: belongData,
    config: {
      mode: "static",
      label: "name",
      value: "value",
    },
  },
];
</script>

<style lang="less">
.tag {
  margin-bottom: 5px;
  list-style: none;
}
</style>
