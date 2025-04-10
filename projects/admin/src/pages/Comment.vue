<template>
  <TablePlus
    :columns="columns"
    :rowActions="rowActions"
    :batchActions="batchActions"
    :api="commentApi.fetch"
    :tree-props="{ children: 'replies', hasChildren: 'hasChildren' }"
    ref="table"
    :stripe="false"
    :row-class-name="rowClassName"
    :allow-add="false"
    search-schema-id="28"
  />

  <FormModal
    v-model:visible="formState.visible"
    v-model:values="formState.values"
    schemaId="25"
    :title="formState.title"
    :loading="formState.loading"
    @onOk="formState.onOk"
  />
</template>

<script setup lang="tsx">
import commentApi from '@/api/comment'
import { FormModal, TablePlus } from '@/components'
import type { TablePlusBatchActions, TablePlusColumns, TablePlusRowActions } from '@/global'
import { formatTime } from '@/utils'
import { Delete } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { reactive, useTemplateRef } from 'vue'
import type { FormSchema } from 'vue-form-craft'

const table = useTemplateRef('table')

const typeEnum: Record<string, string> = {
  article: '文章评论',
  comment: '【留言版】留言',
  link: '【友链】留言',
  about: '【关于】留言',
}

const columns = [
  {
    label: 'ID',
    prop: 'id',
    sortable: true,
    width: 100,
  },
  {
    label: '类型',
    prop: 'type',
    width: 150,
    formatter(row, column, cellValue, index) {
      if (row.parentComment) {
        return <el-tag type="success">回复【{row.targetComment.nickname}】</el-tag>
      }
      return <el-tag type="primary">{typeEnum[cellValue]}</el-tag>
    },
  },
  {
    label: '头像',
    prop: 'avatar',
    width: 150,
    formatter(row, column, cellValue, index) {
      return <el-avatar src={cellValue} />
    },
  },
  {
    label: '昵称',
    prop: 'nickname',
    width: 150,
  },
  {
    label: '留言内容',
    prop: 'content',
    width: 250,
  },
  {
    label: '留言时间',
    prop: 'created_at',
    formatter(row, column, cellValue, index) {
      return formatTime(cellValue)
    },
  },
  {
    label: '所属文章',
    prop: 'article',
    width: 250,
    formatter(row, column, cellValue, index) {
      return (
        <el-link type="primary" href={`/article/${cellValue}`}>
          {row.parentArticle?.title}
        </el-link>
      )
    },
  },
  {
    label: '地区',
    prop: 'region',
    width: 250,
  },
  {
    label: '城市',
    prop: 'city',
    width: 250,
  },
  {
    label: '浏览器',
    prop: 'browser',
    width: 250,
  },
  {
    label: '操作系统',
    prop: 'os',
    width: 250,
  },
] satisfies TablePlusColumns

const formState = reactive({
  visible: false,
  values: { name: '' },
  title: '新增文章',
  loading: false,
  onOk: () => {},
  schema: {
    labelWidth: 150,
    labelAlign: 'top',
    size: 'default',
    items: [
      {
        label: '文章标题',
        component: 'Input',
        props: {
          placeholder: '请输入...',
        },
        name: 'name',
        required: true,
      },
    ],
  } satisfies FormSchema,
})

const rowActions = [
  {
    name: '删除',
    type: 'danger',
    icon: Delete,
    onClick: async (data: Record<string, any>) => {
      await ElMessageBox.confirm('确认删除吗？')
      await commentApi.delete({ ids: data.id })
      ElMessage.success('删除成功！')
      table.value?.refresh()
    },
  },
] satisfies TablePlusRowActions

const batchActions = [
  {
    name: '删除',
    type: 'danger',
    icon: Delete,
    onClick: async ({ keys }) => {
      await ElMessageBox.confirm('确认删除吗？')
      await commentApi.delete({ ids: keys })
      ElMessage.success('删除成功！')
      table.value?.refresh()
    },
  },
] satisfies TablePlusBatchActions

const rowClassName = (data: { row: any; rowIndex: number }) => {
  return data.row.parentComment ? 'reply-row' : ''
}
</script>

<style lang="scss">
.design {
  width: 100%;
  height: 70vh;
  padding: 10px;
  border: 1px solid #eee;
  border-radius: 4px;
}

.el-table .reply-row {
  background-color: #eee;
}
</style>
