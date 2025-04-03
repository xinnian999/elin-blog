<template>
  <div class="grid-table">
    <div class="searchbar" v-show="state.isSearch">
      <Form
        :schemaId="props.searchSchemaId"
        :schema="props.searchSchema"
        inline
        v-model="searchValues"
      />

      <div class="searchbar-actions">
        <el-button type="primary" @click="handleSearch">搜索</el-button>
        <el-button type="primary" @click="handleSearchReset">重置</el-button>
      </div>
    </div>

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
        <el-button type="success" size="small" :icon="Plus" @click="emits('onClickAdd')">
          新增
        </el-button>

        <el-button type="primary" :icon="Search" @click="state.isSearch = !state.isSearch" />

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
      v-loading="fetchRequest.loading"
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
import { defineProps, defineExpose, watch, reactive, useTemplateRef, ref, onMounted } from 'vue'
import { Hide, Plus, Refresh } from '@element-plus/icons-vue'
import type { TablePlusBatchActions, TablePlusColumns, TablePlusRowActions } from '@/global'
import { Search } from '@element-plus/icons-vue'
import { Form } from '@/components'
import { useRoute } from 'vue-router'
import type { FormSchema } from 'vue-form-craft'
import { useRequest } from '@/use'

const props = defineProps<{
  columns: TablePlusColumns
  api: (params: Record<string, any>) => Promise<Record<string, any>>
  rowActions?: TablePlusRowActions
  batchActions?: TablePlusBatchActions
  searchSchemaId?: string
  searchSchema?: FormSchema
}>()

const emits = defineEmits(['onClickAdd'])

const table = useTemplateRef('table')

const state = reactive({
  dataSource: [],
  total: 0,
  selectedRows: [] as any[],
  selectedRowKeys: [] as any[],
  visibleColumns: props.columns.map((column) => column.prop),
  isSearch: false,
})

const params = reactive({
  pageNum: 1,
  pageSize: 10,
  filters: {},
  orderBys: {
    id: 'desc',
  },
})

const searchValues = ref<Record<string, any>>({})

const route = useRoute()

const fetchRequest = useRequest(props.api)

const refresh = async () => {
  const { list, total } = await fetchRequest.run(params)

  state.dataSource = list
  state.total = total

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

const handleSearch = () => {
  params.filters = { ...searchValues.value }
}

const handleSearchReset = () => {
  searchValues.value = {}
  params.filters = {}
}

watch(params, () => {
  refresh()
})

onMounted(() => {
  const defaultFilters = Object.entries(route.query).reduce<Record<string, any>>(
    (acc, [key, value]) => {
      acc[key] = JSON.parse(value as string)

      return acc
    },
    {},
  )

  // 如果存在默认过滤条件，则利用过滤监听 来触发初始化刷新
  if (Object.keys(defaultFilters).length > 0) {
    params.filters = { ...defaultFilters }
    searchValues.value = { ...defaultFilters }
    state.isSearch = true
  } else {
    refresh() // 否则主动初始化刷新
  }
})

//  抛出方法
defineExpose({ refresh })
</script>

<style lang="scss">
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

  .searchbar {
    padding: 10px;
    border-bottom: 1px solid #e0e0e0;
    .searchbar-actions {
      display: flex;
      justify-content: right;
      padding-right: 10px;
    }
  }

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
