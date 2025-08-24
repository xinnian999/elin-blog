"use client";
import { Modal } from "@/components";
import { useSetState } from "ahooks";
import classNames from "classnames";
import { useState } from "react";
import useStore from "@/store";
import { useMessage } from "@/hooks";
import { applyLink } from "@/services";

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

export default function ApplyButton() {
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
    await applyLink(values);

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
    <>
      <button className="btn btn-primary" onClick={handleApply}>
        申请友链
      </button>

      <Modal
        open={open}
        close={() => setOpen(false)}
        title="申请友链"
        footer={
          <button
            className={classNames("btn btn-primary", {
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
    </>
  );
}
