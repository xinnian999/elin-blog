"use client";
import { Card, Modal } from "@/components";
import { createLink, fetchLinkListByPass } from "@elin-blog/db";
import { useRequest, useSetState } from "ahooks";
import classNames from "classnames";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const fields = [
  { label: "名称", name: "name" },
  { label: "地址", name: "url" },
  { label: "头像链接", name: "avatar" },
  { label: "描述", name: "desc" },
];

export default function About() {
  const [tip, setTip] = useState(false);
  const [open, setOpen] = useState(false);
  const [values, setValues] = useSetState({
    name: "",
    url: "",
    avatar: "",
    desc: "",
  });

  const pass = Object.values(values).some((value) => !value);

  const { data } = useRequest(fetchLinkListByPass);

  const clearForm = () => {
    setValues({
      name: "",
      url: "",
      avatar: "",
      desc: "",
    });
  };

  const handleSubmit = async () => {
    await createLink(values);

    setOpen(false);

    setTip(true);

    setTimeout(() => {
      setTip(false);
    }, 3000);

    clearForm();
  };

  const handleApply = () => {
    setOpen(true);
  };

  return (
    <div className="flex flex-col gap-6">
      <Card title="友情链接">
        <div className="mt-4">
          <button className="btn btn-primary" onClick={handleApply}>
            申请友链
          </button>

          <div className="divider" />

          <div className="grid grid-cols-3 gap-8">
            {data?.map((item) => {
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
                  placeholder={`你的网站${item.label}`}
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

      {tip && (
        <div className="toast toast-top toast-center z-30">
          <div className="alert alert-success">
            <span>申请成功！审核通过后展示</span>
          </div>
        </div>
      )}
    </div>
  );
}
