"use client";
import { Card, Comment, Modal, Alert } from "@/components";
import { Link as LinkEntity } from "@/db";
import { useSetState } from "ahooks";
import classNames from "classnames";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import useStore from "@/store";
import { useMessage } from "@/hooks";

const fields = [
  { label: "名称", name: "name", placeholder: "你的网站名称" },
  { label: "地址", name: "url", placeholder: "你的网站地址" },
  { label: "头像链接", name: "avatar", placeholder: "你的网站头像链接" },
  { label: "描述", name: "desc", placeholder: "你的网站描述" },
  {
    label: "邮箱",
    name: "email",
    placeholder: "选填，友链通过后会收到邮件提醒",
  },
];

export default function LinkPage({
  dataSource,
}: {
  dataSource: LinkEntity[];
}) {
  const [open, setOpen] = useState(false);

  const email = useStore((state) => state.userInfo.email);

  const message = useMessage();

  const [values, setValues] = useSetState({
    name: "",
    url: "",
    avatar: "",
    desc: "",
    email,
  });

  const pass = Object.values(values).some((value) => !value);

  const clearForm = () => {
    setValues({
      name: "",
      url: "",
      avatar: "",
      desc: "",
    });
  };

  const handleSubmit = async () => {
    await fetch("/api/link/apply", {
      method: "POST",
      body: JSON.stringify(values),
    });

    setOpen(false);

    message.success("申请成功！请等待博主审核！");

    clearForm();
  };

  const handleApply = () => {
    setOpen(true);
    setValues({
      email,
    });
  };

  return (
    <div className="flex flex-col gap-6">
      <Card title="友情链接">
        <div className="mt-4">
          <Alert>
            本页友链随机排序！
            <br />
            申请友链请点击下方按钮！如果需要修改友联信息，请在下方评论区留言！
          </Alert>

          <button className="btn btn-primary" onClick={handleApply}>
            申请友链
          </button>

          <div className="divider" />

          <div className="grid grid-cols-3 gap-8">
            {dataSource.map((item) => {
              if (!item.url.includes("://")) {
                item.url = "https://" + item.url;
              }
              return (
                <div
                  className="h-20 bg-base-300 rounded-lg flex items-center p-4 gap-4  overflow-hidden"
                  key={item.id}
                >
                  <div className="avatar">
                    <div className="w-14 h-14 rounded-full">
                      <Image src={item.avatar} width={30} height={30} alt="" />
                    </div>
                  </div>

                  <div className="flex-1 flex flex-col gap-2  overflow-hidden">
                    <div className="font-bold text-blue-500 hover:text-blue-700">
                      <Link href={item.url} target="_blank">
                        {item.name}
                      </Link>
                    </div>
                    <div
                      className="text-sm text-ellipsis whitespace-nowrap  overflow-hidden"
                      title={item.desc}
                    >
                      {item.desc}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Card>

      <Modal
        open={open}
        close={() => setOpen(false)}
        title="申请友链"
        footer={
          <button
            className={classNames("btn", {
              "btn-disabled": pass,
            })}
            onClick={handleSubmit}
          >
            提交申请
          </button>
        }
      >
        <div className="flex flex-col gap-4">
          {fields.map((item) => {
            const name = item.name as keyof typeof values;
            return (
              <label className="input w-full" key={name}>
                <span className="label w-24 text-right">{item.label}</span>
                <input
                  type="text"
                  placeholder={item.placeholder}
                  className="w-full"
                  value={values[name]}
                  onChange={(e) =>
                    setValues((prev) => ({
                      ...prev,
                      [name]: e.target.value,
                    }))
                  }
                />
              </label>
            );
          })}
        </div>
      </Modal>

      <Comment type="link" />
    </div>
  );
}
