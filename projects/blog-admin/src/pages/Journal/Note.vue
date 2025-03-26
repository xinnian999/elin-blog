<template>
  <TablePlus table="note" :columns="columns" :formData="formData" />
</template>

<script setup lang="jsx">
const columns = [
  {
    title: "标题",
    dataIndex: "title",
  },
  {
    title: "笔记内容",
    dataIndex: "content",
  },
];

const formData = [
  {
    label: "标题",
    value: "title",
    component: "input",
  },
  {
    label: "说说",
    value: "content",
    component: "textarea",
  },
];
</script>
