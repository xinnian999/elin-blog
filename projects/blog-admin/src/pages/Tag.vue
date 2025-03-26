<template>
  <TablePlus
    :columns="columns"
    table="tag"
    :formData="formData"
    :defaultSort="{ prop: 'id', order: 'descending' }"
    :toolbarAction="toolbarAction"
    ref="tableRef"
  />
</template>

<script setup lang="jsx">
import { ElTag, ElMessage } from "element-plus";
import { request } from "@/utils";
import { ref } from "vue";

const tableRef = ref();

const columns = [
  {
    title: "标签名",
    dataIndex: "name",
    render: ({ name }) => {
      return (
        <ElTag effect="dark" type="info">
          {name}
        </ElTag>
      );
    },
  },
  {
    title: "关联数量",
    dataIndex: "count",
  },
];

const formData = [
  {
    label: "标签名",
    value: "name",
    component: "input",
  },
];

const toolbarAction = [
  {
    name: "更新关联数量",
    type: "warning",
    onClick: async () => {
      const { status } = await request.put("/tag/updateAllTagCount");
      if (status === 0) {
        ElMessage.success("更新成功");
        tableRef.value.fetchData();
      }
    },
  },
];
</script>
