<template>
  <TablePlus
    :columns="columns"
    :rowActions="rowActions as TablePlusRowActions"
    :batchActions="batchActions"
    :api="linkApi.fetch"
    @onClickAdd="onClickAdd"
    ref="table"
  />

  <FormModal
    v-model:visible="formState.visible"
    v-model:values="formState.values"
    schemaId="27"
    :title="formState.title"
    :loading="formState.loading"
    @onOk="formState.onOk"
  />
</template>

<script setup lang="tsx">
import linkApi from '@/api/link'
import { FormModal, TablePlus } from '@/components'
import type { TablePlusBatchActions, TablePlusColumns, TablePlusRowActions } from '@/global'
import { useRequest } from '@/use'
import { Check, Close, Delete, Edit } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { reactive, toRef, useTemplateRef } from 'vue'
import type { FormSchema } from 'vue-form-craft'

const LinkStatus = {
  0: { text: '待审核', type: 'warning' },
  1: { text: '审核拒绝', type: 'danger' },
  2: { text: '审核通过', type: 'success' },
} as Record<number, { text: string; type: string }>

const table = useTemplateRef('table')

const columns = [
  {
    label: 'ID',
    prop: 'id',
    sortable: true,
    width: 70,
  },
  {
    label: '状态',
    prop: 'status',
    width: 120,
    formatter(row, column, cellValue, index) {
      return <el-tag type={LinkStatus[cellValue].type}>{LinkStatus[cellValue].text}</el-tag>
    },
  },
  {
    label: '头像',
    prop: 'avatar',
    width: 120,
    formatter(row, column, cellValue, index) {
      return <el-avatar src={cellValue} />
    },
  },
  {
    label: '名称',
    prop: 'name',
  },
  {
    label: 'URL',
    prop: 'url',
    formatter(row, column, cellValue, index) {
      return (
        <el-link type="primary" href={cellValue} target="_blank">
          {cellValue}
        </el-link>
      )
    },
  },
  {
    label: '描述',
    prop: 'desc',
  },
  // {
  //   label: '创建时间',
  //   prop: 'created_at',
  //   formatter(row, column, cellValue, index) {
  //     return formatTime(cellValue)
  //   },
  // },
  // {
  //   label: '最后更新时间',
  //   prop: 'updated_at',
  //   formatter(row, column, cellValue, index) {
  //     return formatTime(cellValue)
  //   },
  // },
] satisfies TablePlusColumns

const formState = reactive({
  visible: false,
  values: { name: '' },
  title: '新增友链',
  loading: false,
  onOk: () => {},
  schema: {
    labelWidth: 150,
    labelAlign: 'top',
    size: 'default',
    items: [
      {
        label: '友链标题',
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

const createLinkRequest = useRequest(linkApi.create)

const updateLinkRequest = useRequest(linkApi.update)

const onClickAdd = () => {
  Object.assign(formState, {
    title: '新增友链',
    visible: true,
    values: {
      name: '',
    },
    loading: toRef(createLinkRequest, 'loading'),
    onOk: async () => {
      await createLinkRequest.run(formState.values)
      ElMessage.success('新增友链成功！')
      formState.visible = false
      table.value?.refresh()
    },
  })
}

const rowActions = (row: Record<string, any>) => {
  if (row.status === 0) {
    return [
      {
        name: '通过',
        type: 'success',
        icon: Check,
        onClick: async () => {
          await ElMessageBox.confirm('确认可以通过吗？')
          await linkApi.pass({ id: row.id })
          ElMessage.success('通过成功！')
          table.value?.refresh()
        },
      },
      {
        name: '拒绝',
        type: 'danger',
        icon: Close,
        onClick: async () => {
          const reason = await ElMessageBox.prompt('请输入拒绝原因', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
          })

          await linkApi.refuse({ id: row.id, reason: reason.value })

          ElMessage.success('拒绝成功！')

          table.value?.refresh()
        },
      },
    ]
  }

  return [
    {
      name: '修改',
      type: 'primary',
      icon: Edit,
      onClick: (data: Record<string, any>) => {
        Object.assign(formState, {
          title: '修改友链',
          visible: true,
          values: data,
          loading: toRef(updateLinkRequest, 'loading'),
          onOk: async () => {
            await updateLinkRequest.run(formState.values)
            ElMessage.success('修改友链成功！')
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
        await linkApi.delete({ ids: data.id })
        ElMessage.success('删除成功！')
        table.value?.refresh()
      },
    },
  ]
}

const batchActions = [
  {
    name: '删除',
    type: 'danger',
    icon: Delete,
    onClick: async ({ keys }) => {
      await ElMessageBox.confirm('确认删除吗？')
      await linkApi.delete({ ids: keys })
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
