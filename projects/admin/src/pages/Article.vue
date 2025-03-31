<template>
  <TablePlus
    :columns="columns"
    :rowActions="rowActions"
    :batchActions="batchActions"
    :api="articleApi.fetchData"
    @onClickAdd="onClickAdd"
    ref="table"
  />

  <FormModal
    v-model:visible="formState.visible"
    v-model:values="formState.values"
    width="90vw"
    schemaId="22"
    :title="formState.title"
    :loading="formState.loading"
    @onOk="formState.onOk"
  />
</template>

<script setup lang="tsx">
import articleApi from '@/api/article'
import { FormModal, TablePlus } from '@/components'
import type { TablePlusBatchActions, TablePlusColumns, TablePlusRowActions } from '@/global'
import { useRequest } from '@/use'
import { formatTime } from '@/utils'
import { Delete, Edit } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { reactive, useTemplateRef } from 'vue'
import type { FormSchema } from 'vue-form-craft'

const table = useTemplateRef('table')

const columns = [
  {
    label: 'ID',
    prop: 'id',
    sortable: true,
    width: 100,
  },
  {
    label: '标题',
    prop: 'title',
    width: 250,
  },
  {
    label: '分类',
    prop: 'categoryText',
  },
  {
    label: '标签',
    prop: 'tagTexts',
    formatter: (row, column, cellValue, index) => {
      return (
        <el-space>
          {cellValue.map((tag: string) => (
            <el-tag key={tag}>{tag}</el-tag>
          ))}
        </el-space>
      )
    },
  },
  {
    label: '创建时间',
    prop: 'created_at',
    formatter(row, column, cellValue, index) {
      return formatTime(cellValue)
    },
  },
  {
    label: '最后更新时间',
    prop: 'updated_at',
    formatter(row, column, cellValue, index) {
      return formatTime(cellValue)
    },
  },
] satisfies TablePlusColumns

const formState = reactive({
  visible: false,
  values: {},
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

const createFormRequest = useRequest(articleApi.create)

const updateFormRequest = useRequest(articleApi.update)

const onClickAdd = () => {
  Object.assign(formState, {
    title: '新增表单',
    visible: true,
    values: {
      name: '',
      schema: { items: [] },
    },
    loading: createFormRequest.loading,
    onOk: async () => {
      await createFormRequest.run({
        name: formState.values.name,
        schema: JSON.stringify(formState.values.schema),
      })
      ElMessage.success('新增表单成功！')
      formState.visible = false
      table.value?.refresh()
    },
  })
}

const rowActions = [
  {
    name: '修改',
    type: 'primary',
    icon: Edit,
    onClick: (data: Record<string, any>) => {
      Object.assign(formState, {
        title: '修改表单',
        visible: true,
        values: {
          name: data.name,
          schema: JSON.parse(data.schema),
        },
        loading: updateFormRequest.loading,
        onOk: async () => {
          await updateFormRequest.run({
            id: data.id,
            name: formState.values.name,
            schema: JSON.stringify(formState.values.schema),
          }),
            ElMessage.success('修改表单成功！')
          formState.visible = false
          table.value?.refresh()
        },
      })
    },
  },
  {
    name: '删除',
    type: 'danger',
    icon: Delete,
    onClick: async (data: Record<string, any>) => {
      await ElMessageBox.confirm('确认删除吗？')
      await articleApi.deleteData({ ids: data.id })
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
      await articleApi.deleteForm({ ids: keys })
      ElMessage.success('删除成功！')
      table.value?.refresh()
    },
  },
] satisfies TablePlusBatchActions
</script>

<style lang="scss">
.design {
  width: 100%;
  height: 70vh;
  padding: 10px;
  border: 1px solid #eee;
  border-radius: 4px;
}
</style>
