"use client";

import React, { useState } from "react";
import { Button, Form, message, Modal, Space, Table } from "antd";
import styles from "./styles.module.scss";
import { PlusOutlined, RedoOutlined } from "@ant-design/icons";
import { useRequest, useSetState } from "ahooks";
import { ObjectLiteral } from "typeorm";
import { FormSchema, TablePlusProps } from "./interface";

const TablePlus = <T extends ObjectLiteral>({
  columns,
  api,
  createConfig,
  deleteApi
}: TablePlusProps<T>) => {
  const [dataSource, setDataSource] = useState<T[]>([]);

  const [form] = Form.useForm();

  const [modalState, setModalState] = useSetState({
    open: false,
    confirmLoading: false,
    title: "新增",
    onCancel: () => setModalState({ open: false }),
    schema: {
      items: [],
    } as FormSchema,
    onOk: async () => {
      await form.validateFields();
    },
  });

  const { loading, refresh } = useRequest(api, {
    onSuccess: setDataSource,
  });

  const handleAdd = async () => {
    setModalState({
      open: true,
      schema: createConfig!.schema,
      onOk: async () => {
        await form.validateFields();
        await createConfig!.api(form.getFieldsValue());

        modalState.onCancel();
        message.success("新增成功");
        refresh();
        form.resetFields();
      },
    });
  };

  const handleDelete = async (id: number) => {
    Modal.confirm({
      title: "确认删除吗？",
      async onOk() {
        await deleteApi(id)
        message.success("删除成功");
        refresh();
      },
    });
  };


  return (
    <div className={styles.TablePlus}>
      <div className={styles.toolbar}>
        <div className={styles.left}>
          {createConfig && (
            <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
              新增
            </Button>
          )}
        </div>

        <div className={styles.right}>
          <Button type="primary" icon={<RedoOutlined />} onClick={refresh} />
        </div>
      </div>

      <Table
        className={styles.table}
        columns={[
          ...columns,
          {
            title: "操作",
            render: (record) => {
              return (
                <Space>
                  <Button color="cyan" type="primary" size="small">
                    修改
                  </Button>
                  <Button
                    danger
                    type="primary"
                    size="small"
                    onClick={handleDelete.bind(this, record.id)}
                  >
                    删除
                  </Button>
                </Space>
              );
            },
          },
        ]}
        dataSource={dataSource}
        scroll={{ y: "60vh" }}
        loading={loading}
      />

      <Modal {...modalState} destroyOnClose>
        <Form labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} form={form}>
          {modalState.schema.items.map((item) => {
            return (
              <Form.Item key={item.name} {...item}>
                {item.component}
              </Form.Item>
            );
          })}
        </Form>
      </Modal>
    </div>
  );
};

export default TablePlus;
