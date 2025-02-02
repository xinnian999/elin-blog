"use client";

import styles from "./styles.module.scss";
import React from "react";
import type { FormProps } from "antd";
import { Button, Form, Input, message } from "antd";
import { loginAdmin } from "@/db/service/auth";
import { useRouter } from "next/navigation";
import "@ant-design/v5-patch-for-react-19";
import Link from "next/link";
import { HomeOutlined } from "@ant-design/icons";

type FieldType = {
  username: string;
  password: string;
};

function Login() {
  const router = useRouter();

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    try {
      await loginAdmin(values);
      router.push("/admin");

      message.success("登录成功");
    } catch {
      console.log(1111);
      message.error("用户名或密码错误");
    }
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className={styles.login}>
      <Link href="/">
        <div className="absolute right-7 top-7 btn">
          <HomeOutlined />
        </div>
      </Link>

      <div className={styles.form}>
        <p className={styles.title}>登录后台管理</p>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 24 }}
          style={{ width: "100%" }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          layout="vertical"
        >
          <Form.Item<FieldType>
            label="用户名"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="密码"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>

          <div className={styles.actions}>
            <Button type="primary" htmlType="submit" block>
              登录
            </Button>
            <Button block>游客访问</Button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Login;
