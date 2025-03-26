<template>
  <div class="grid-table">
    <div class="toolbar">
      <div></div>

      <div class="toolButton">
        <el-button type="success" size="small" :icon="Plus" @click="emits('onClickAdd')"
          >新增</el-button
        >
        <el-button type="primary" :icon="Refresh" @click="refresh" />
      </div>
    </div>

    <el-table
      :data="state.dataSource"
      v-loading="state.isLoading"
      height="100%"
      border
      stripe
      @selection-change="handleSelectionChange"
      row-key="id"
      empty-text="暂无数据"
    >
      <el-table-column type="selection" width="55" :reserve-selection="true" />

      <el-table-column
        v-for="{ label, prop, formatter, width, fixed } in columns"
        :key="prop"
        :prop
        :label
        :formatter
        :width
        :fixed
        :column-key="prop"
      />
    </el-table>

    <div class="footer">
      <el-pagination
        background
        layout="total, sizes, prev, pager, next, jumper"
        v-model:page-size="params.pageSize"
        v-model:currentPage="params.pageNum"
        :page-sizes="[5, 10, 20, 50, 100]"
        :total="state.total"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineExpose, watch, reactive } from 'vue'
import { request } from '@/utils'
import { Plus, Refresh } from '@element-plus/icons-vue'
import type { TablePlusColumns } from '@/global'

const props = defineProps<{
  columns: TablePlusColumns
  api: {
    path: string
    params?: Record<string, any>
  }
}>()

const emits = defineEmits(['onClickAdd'])

const state = reactive({
  isLoading: false,
  dataSource: [],
  total: 0,
  selected: [],
})

const params = reactive({
  pageNum: 1,
  pageSize: 10,
  filters: {},
  orderBys: {},
})

const refresh = async () => {
  state.isLoading = true

  const { status, data } = await request(props.api.path, {
    params: { ...params, ...props.api.params },
  })

  if (status === 200) {
    const { list, total } = data

    state.dataSource = list
    state.total = total
  }

  state.isLoading = false
}

const handleSelectionChange = (rows) => {
  state.selected = rows
}

watch(
  params,
  () => {
    refresh()
  },
  { immediate: true },
)

//  抛出方法
defineExpose({ refresh })
</script>

<style lang="less">
.batchActions {
  display: flex;
  justify-content: right;
}

.grid-table {
  display: flex;
  height: 100%;
  flex-direction: column;
  position: relative;
  background-color: #fff;
  box-sizing: border-box;
  border-radius: 5px;

  .toolbar {
    display: flex;
    justify-content: space-between;
    padding: 10px;

    button {
      height: 100%;
    }
  }

  .cell {
    text-align: center;
  }

  .footer {
    display: flex;
    justify-content: right;
    padding: 10px;
  }
}
</style>
