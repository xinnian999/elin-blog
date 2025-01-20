"use client";

import React from "react";
import { Table } from "antd";
import type { TableProps } from "antd";
import { Article } from "@/db";

interface TablePlusProps {
  dataSource: Article[];
  columns: TableProps<Article>["columns"];
}

const TablePlus: React.FC<TablePlusProps> = ({ columns, dataSource }) => {
  return <Table<Article> columns={columns} dataSource={dataSource} />;
};

export default TablePlus;
