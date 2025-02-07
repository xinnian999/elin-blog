"use client";
import { TablePlus } from "@/components";
import { LinkStatus } from "@elin-blog/db";
import {
  createLink,
  deleteLink,
  fetchLinkList,
  passLink,
  refuseLink,
} from "@elin-blog/db";
import { Button, Input, message, Modal, Space, Tag, Avatar } from "antd";

function Link() {
  return (
    <TablePlus
      columns={[
        {
          title: "ID",
          dataIndex: "id",
          key: "id",
          defaultSortOrder: "descend",
          sorter: (a, b) => a.id - b.id,
          width: 100,
        },
        {
          title: "状态",
          dataIndex: "status",
          key: "status",
          width: 100,
          render: (val: number) => {
            const colors: Record<number, string> = {
              0: "processing",
              1: "error",
              2: "success",
            };
            return <Tag color={colors[val]}>{LinkStatus[val]}</Tag>;
          },
        },
        {
          title: "头像",
          dataIndex: "avatar",
          key: "avatar",
          render: (val) => <Avatar src={val} alt={"头像"} size={64} />,
        },
        {
          title: "名称",
          dataIndex: "name",
          key: "name",
        },
        {
          title: "地址",
          dataIndex: "url",
          key: "url",
          render: (val) => (
            <Button type="link" size="small">
              {val}
            </Button>
          ),
        },
        {
          title: "描述",
          dataIndex: "desc",
          key: "desc",
        },
      ]}
      api={fetchLinkList}
      createConfig={{
        api: createLink,
        title: "新增友情链接",
        schema: {
          items: [
            {
              name: "name",
              label: "名称",
              required: true,
              component: <Input />,
            },
            {
              name: "url",
              label: "地址",
              required: true,
              component: <Input />,
            },
            {
              name: "avatar",
              label: "头像",
              required: true,
              component: <Input />,
            },
            {
              name: "desc",
              label: "描述",
              required: true,
              component: <Input />,
            },
          ],
        },
      }}
      deleteApi={deleteLink}
      renderRowActions={({ record, basic, refresh }) => {
        if (record.status === 0) {
          return (
            <Space>
              <Button
                key="1"
                size="small"
                onClick={async () => {
                  Modal.confirm({
                    title: "确认可以通过吗？",
                    async onOk() {
                      await passLink(record.id!);
                      message.success("通过成功");
                      refresh();
                    },
                  });
                }}
              >
                通过
              </Button>
              <Button
                key="2"
                size="small"
                onClick={async () => {
                  Modal.confirm({
                    title: "确认拒绝吗？",
                    async onOk() {
                      await refuseLink(record.id!);
                      message.success("拒绝成功");
                      refresh();
                    },
                  });
                }}
              >
                拒绝
              </Button>
            </Space>
          );
        }
        return basic;
      }}
    />
  );
}

export default Link;
