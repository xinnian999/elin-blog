<template>
  <TablePlus
    :columns="columns"
    :rowActions="rowActions"
    :batchActions="batchActions"
    :api="tagApi.fetch"
    @onClickAdd="onClickAdd"
    ref="table"
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
import tagApi from '@/api/tag'
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
    label: '名称',
    prop: 'name',
    width: 250,
  },
  {
    label: '文章数量',
    prop: 'articleCount',
    formatter(row, column, cellValue, index) {
      return (
        <el-link type="primary" href={`/article?tags=[${row.id}]`}>
          {cellValue}
        </el-link>
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

const createFormRequest = useRequest(tagApi.create)

const updateFormRequest = useRequest(tagApi.update)

const onClickAdd = () => {
  Object.assign(formState, {
    title: '新增标签',
    visible: true,
    values: {
      name: '',
    },
    loading: createFormRequest.loading,
    onOk: async () => {
      await createFormRequest.run(formState.values)
      ElMessage.success('新增标签成功！')
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
        title: '修改标签',
        visible: true,
        values: {
          name: data.name,
        },
        loading: updateFormRequest.loading,
        onOk: async () => {
          await updateFormRequest.run({
            id: data.id,
            name: formState.values.name,
          }),
            ElMessage.success('修改标签成功！')
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
      await tagApi.delete({ ids: data.id })
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
      await tagApi.delete({ ids: keys })
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
