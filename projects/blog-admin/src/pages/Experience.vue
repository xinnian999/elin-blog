<template>
  <TablePlus table="experience" :columns="columns" :formData="formData" />
</template>

<script setup lang="jsx">
const columns = [
  {
    title: "句子",
    dataIndex: "content",
  },
];

const formData = [
  {
    label: "内容",
    value: "content",
    component: "textarea",
    required: true,
  },
];
</script>
