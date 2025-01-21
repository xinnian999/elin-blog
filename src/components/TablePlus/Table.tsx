"use server";

import React from "react";
import { Table as AntdTable, TableProps as AntdTableProps } from "antd";
import { fetchArticleData } from "@/db";
import styles from "./styles.module.css";

interface TableProps extends AntdTableProps {
  k?: string;
}

const Table: React.FC<TableProps> = async ({ columns }) => {
  const articles = await fetchArticleData();
  return (
    <AntdTable
      className={styles.table}
      columns={columns}
      dataSource={articles}
      scroll={{ y: '60vh'}}
    />
  );
};

export default Table;
