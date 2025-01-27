import { TablePlus } from "@/components";
import { fetchLinkList } from "@/db/service/link";

async function Link() {
  return (
    <TablePlus
      columns={[
        {
          title: "ID",
          dataIndex: "id",
          key: "id",
          // defaultSortOrder: "descend",
          // sorter: (a, b) => a.id - b.id,
          width: 120,
        },
        {
          title: "友链名称",
          dataIndex: "name",
          key: "name",
        },
        {
          title: "友链地址",
          dataIndex: "link",
          key: "link",
        },
        {
          title: "友链头像",
          dataIndex: "link",
          key: "avatar",
        },
        {
          title: "友链描述",
          dataIndex: "link",
          key: "desc",
        }
      ]}
      api={fetchLinkList}
    />
  );
}

export default Link;
