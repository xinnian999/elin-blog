<template>
  <TablePlus
    table="comment"
    :columns="columns"
    :rowAction="rowAction"
    :defaultSort="{ prop: 'datetime', order: 'descending' }"
    :formData="editFormData"
    :disabled="['add']"
    ref="tableRef"
  />

  <FormModal
    :title="`回复 ${currentInfo.author}`"
    width="40%"
    :formData="replyFormData"
    :ok="handleSendReply"
    :visible="formVisible"
    @close="() => (formVisible = false)"
    ref="formRef"
  />
</template>

<script setup lang="jsx">
import { ref } from "vue";
import { request } from "@/utils";
import { ElMessage } from "element-plus";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import updateLocale from "dayjs/plugin/updateLocale";
import { ChatLineRound } from "@element-plus/icons-vue";
dayjs.extend(relativeTime);
dayjs.extend(updateLocale);

dayjs.updateLocale("en", {
  relativeTime: {
    future: "in %s",
    past: "%s前",
    s: "几秒",
    m: "1分钟",
    mm: "%d分钟",
    h: "1小时",
    hh: "%d小时",
    d: "1天",
    dd: "%d天",
    M: "1个月",
    MM: "%d个月",
    y: "1年",
    yy: "%d年",
  },
});

const tableRef = ref();

const formRef = ref();

const formVisible = ref(false);

const currentInfo = ref({});

const columns = [
  {
    title: "头像",
    dataIndex: "avatar",
    fixed: "left",
    width: 100,
    render: (record) => (
      <el-image src={record.avatar} style="width: 50px; height: 50px" />
    ),
  },
  {
    title: "昵称",
    dataIndex: "author",
    search: true,
  },
  {
    title: "评论内容",
    dataIndex: "content",
    search: true,
  },
  {
    title: "类型",
    dataIndex: "article_id",
    filters: [
      { text: "留言板", value: "99999" },
      // { text: "文章回复", value: "<99999" },
    ],
    render: (record) => {
      if (record.article_id === "99999")
        return <el-tag>留言板{record.reply_id && "[回复]"}</el-tag>;
      return (
        <el-tag type="success">文章评论{record.reply_id && "[回复]"}</el-tag>
      );
    },
  },
  {
    title: "评论时间",
    dataIndex: "datetime",
    render: (record) => {
      return dayjs(record.datetime).fromNow();
    },
  },
];

const rowAction = [
  {
    title: "回复",
    type: "success",
    icon: ChatLineRound,
    onClick: (record) => {
      currentInfo.value = record;
      formVisible.value = true;
    },
  },
];

const editFormData = [
  {
    label: `内容`,
    value: "content",
    component: "textarea",
    required: true,
  },
];

const replyFormData = [
  {
    label: `回复内容`,
    value: "content",
    component: "textarea",
    required: true,
  },
];

const handleSendReply = async (values) => {
  const { content } = values;
  const { reply_id, author, email, article_id } = currentInfo.value;
  const data = {
    content,
    author: "hyl",
    author_id: 30,
    reply_Email: email,
    reply_id,
    reply_name: author,
    email: "3307578337@qq.com",
    avatar: "/api/headPicture/1650613539084.jpeg",
    article_id,
  };
  const { status } = await request.post("/comment/add", data);

  if (status === 0) {
    ElMessage.success(`回复成功`);
    formVisible.value = false;
    tableRef.value.fetchData();
  } else {
    ElMessage.error(`回复失败`);
  }
};
</script>
