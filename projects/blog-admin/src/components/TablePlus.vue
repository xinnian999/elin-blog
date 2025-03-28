<template>
  <div class="grid-table">
    <div class="toolbar">
      <div>
        <el-button
          v-for="action in props.batchActions"
          :key="action.name"
          :type="action.type"
          :icon="action.icon"
          :disabled="state.selectedRows.length === 0"
          @click="action.onClick({ rows: state.selectedRows, keys: state.selectedRowKeys })"
        >
          {{ action.name }}
        </el-button>
      </div>

      <div class="toolButton">
        <el-button type="success" size="small" :icon="Plus" @click="emits('onClickAdd')"
          >新增</el-button
        >

        <el-dropdown trigger="click" :hide-on-click="false">
          <el-button type="primary" :icon="Hide" />
          <template #dropdown>
            <el-dropdown-menu>
              <el-checkbox-group v-model="state.visibleColumns">
                <el-dropdown-item v-for="column in props.columns" :key="column.prop">
                  <el-checkbox :label="column.label" :value="column.prop" />
                </el-dropdown-item>
              </el-checkbox-group>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        <el-button type="primary" :icon="Refresh" @click="refresh" />
      </div>
    </div>

    <el-table
      :data="state.dataSource"
      v-loading="state.isLoading"
      height="100%"
      border
      stripe
      @selection-change="onSelectionChange"
      row-key="id"
      empty-text="暂无数据"
      @sort-change="onSortChange"
      :default-sort="{ prop: 'id', order: 'descending' }"
      ref="table"
    >
      <el-table-column type="selection" width="55" :reserve-selection="true" />

      <template v-for="{ label, prop, formatter, width, fixed, sortable } in columns" :key="prop">
        <el-table-column
          v-if="state.visibleColumns.includes(prop)"
          :prop
          :label
          :formatter
          :width
          :fixed
          :column-key="prop"
          :min-width="150"
          :sortable="sortable ? 'custom' : false"
        />
      </template>

      <el-table-column label="操作" fixed="right" :min-width="200">
        <template #default="scope">
          <div>
            <el-button
              v-for="action in props.rowActions"
              :key="action.name"
              :type="action.type"
              :icon="action.icon"
              size="small"
              @click="action.onClick(scope.row)"
            >
              {{ action.name }}
            </el-button>
          </div>
        </template>
      </el-table-column>
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
import { defineProps, defineExpose, watch, reactive, useTemplateRef } from 'vue'
import { Hide, Plus, Refresh } from '@element-plus/icons-vue'
import type { TablePlusBatchActions, TablePlusColumns, TablePlusRowActions } from '@/global'
import type { AxiosResponse } from 'axios'

const props = defineProps<{
  columns: TablePlusColumns
  api: (params: Record<string, any>) => Promise<AxiosResponse<any, any>>
  rowActions?: TablePlusRowActions
  batchActions?: TablePlusBatchActions
}>()

const emits = defineEmits(['onClickAdd'])

const table = useTemplateRef('table')

const state = reactive({
  isLoading: false,
  dataSource: [],
  total: 0,
  selectedRows: [] as any[],
  selectedRowKeys: [] as any[],
  visibleColumns: props.columns.map((column) => column.prop),
})

const params = reactive({
  pageNum: 1,
  pageSize: 10,
  filters: {},
  orderBys: {
    id: 'desc',
  },
})

const refresh = async () => {
  state.isLoading = true

  const { status, data } = await props.api(params)

  if (status === 200) {
    const { list, total } = data

    state.dataSource = list
    state.total = total
  }

  state.isLoading = false
  table.value?.clearSelection()
}

const onSelectionChange = (rows: any[]) => {
  state.selectedRows = rows
  state.selectedRowKeys = rows.map((row) => row.id)
}

const onSortChange = (sort: any) => {
  params.orderBys = {
    ...params.orderBys,
    [sort.prop]: sort.order.replace('ending', ''),
  }
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

    .toolButton {
      display: flex;
      align-items: center;
      gap: 10px;
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
