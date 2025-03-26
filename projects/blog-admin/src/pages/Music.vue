<template>
  <TablePlus table="music" :columns="columns" :formData="formData" />
</template>

<script setup lang="jsx">
import { globalConfig } from "@/utils";

const columns = [
  {
    title: "歌名",
    dataIndex: "name",
  },
  {
    title: "歌手",
    dataIndex: "artist",
  },
  {
    title: "歌曲头像",
    dataIndex: "cover",
    render: (record) => (
      <ElImage
        preview-src-list={[record.cover]}
        preview-teleported
        src={record.cover}
        style={{ height: "60px" }}
      />
    ),
  },
  {
    title: "歌曲地址",
    dataIndex: "url",
    render: (record) => (
      <audio
        src={`${globalConfig.remoteStaticUrl}/music/${record.url}`}
        controls
      />
    ),
  },
];

const formData = [
  {
    label: "歌名",
    value: "name",
    component: "input",
    required: true,
  },
  {
    label: "歌手",
    value: "artist",
    component: "input",
    required: true,
  },
  {
    label: "歌曲头像",
    value: "cover",
    component: "textarea",
    required: true,
  },
  {
    label: "歌曲地址",
    value: "url",
    component: "textarea",
    required: true,
  },
  {
    label: "在线上传",
    value: "url",
    component: "uploadMusic",
  },
];
</script>
