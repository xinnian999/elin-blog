import type { TableColumnCtx } from 'element-plus'
import type { Component, VNode } from 'vue'

declare interface RouteItem {
  title?: string
  path: string
  icon?: Component
  redirect?: string
  name?: string
  component?: () => Promise<any>
}

interface Column {
  label?: string
  prop: string
  width?: number
  fixed?: string
  sortable?: boolean
  width?: number
  formatter?: (
    row: any,
    column: TableColumnCtx<any>,
    cellValue: any,
    index: number,
  ) => VNode | string
}

type TablePlusColumns = Column[]

type RowAction = {
  name: string
  type: 'default' | 'success' | 'warning' | 'info' | 'text' | 'primary' | 'danger'
  icon?: Component
  onClick: (row: Record<string, any>) => void
}

type TablePlusRowActions = RowAction[]

type BatchAction = {
  name: string
  type: 'default' | 'success' | 'warning' | 'info' | 'text' | 'primary' | 'danger'
  icon?: Component
  onClick: (selected: { rows: Record<string, any>[]; keys: any[] }) => void
}

type TablePlusBatchActions = BatchAction[]
