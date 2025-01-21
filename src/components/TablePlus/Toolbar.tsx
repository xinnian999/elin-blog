import { Button } from "antd";
import styles from "./styles.module.css";
import { PlusOutlined } from "@ant-design/icons";

const Toolbar = () => {
  return (
    <div className={styles.toolbar}>
      <Button type="primary" icon={<PlusOutlined/>}>新增</Button>
    </div>
  );
};

export default Toolbar;
