import React from "react";
import Table from "./Table";
import { TableColumnProps } from "antd";
import styles from "./styles.module.css";
import Toolbar from "./Toolbar";

interface TablePlusProps {
  columns: TableColumnProps[];
}

const TablePlus: React.FC<TablePlusProps> = async ({ columns }) => {
  return (
    <div className={styles.TablePlus}>
      <Toolbar/>
      <Table columns={columns} />
    </div>
  );
};

export default TablePlus;
