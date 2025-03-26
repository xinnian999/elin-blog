import type { TableColumnCtx } from 'element-plus'
import type { Component, VNode } from 'vue'

declare interface RouteItem {
  title?: string
  path: string
  icon?: Component
  redirect?: string
  component?: () => Promise<any>
}

interface Column {
  label?: string
  prop: string
  width?: number
  fixed?: string
  formatter?: (
    row: any,
    column: TableColumnCtx<any>,
    cellValue: any,
    index: number,
  ) => VNode | string
}

type TablePlusColumns = Column[]
