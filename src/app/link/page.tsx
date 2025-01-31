"use client";
import { Card } from "@/components";
import { createLink, fetchLinkListByPass } from "@/db/service/link";
import { useRequest, useSetState } from "ahooks";
import classNames from "classnames";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function About() {
  const [tip, setTip] = useState(false);
  const [values, setValues] = useSetState({
    name: "",
    url: "",
    avatar: "",
    desc: "",
  });

  const pass = Object.values(values).some((value) => !value);

  const { data } = useRequest(fetchLinkListByPass);

  const openModal = () =>
    (document.getElementById("my_modal_1") as HTMLDialogElement)?.showModal();
  const closeModal = () =>
    (document.getElementById("my_modal_1") as HTMLDialogElement)?.close();

  const handleSubmit = async () => {
    await createLink(values);

    closeModal();

    setTip(true);

    setTimeout(() => {
      setTip(false);
    }, 3000);
  };

  return (
    <div className="flex flex-col gap-6">
      <Card title="友情链接">
        <div className="mt-4">
          <button className="btn btn-primary" onClick={openModal}>
            申请友链
          </button>

          <div className="divider" />

          <div className="flex gap-12">
            {data?.map((item) => {
              if (!item.url.includes("://")) {
                item.url = "https://" + item.url;
              }
              return (
                <div
                  className="basis-1/3 h-20 bg-base-200 rounded-lg flex items-center p-4 gap-4"
                  key={item.id}
                >
                  <div className="avatar">
                    <div className="w-14 h-14 rounded-full">
                      <Image src={item.avatar} width={30} height={30} alt="" />
                    </div>
                  </div>

                  <div className="flex-1 flex flex-col gap-2">
                    <div className="font-bold text-blue-500 hover:text-gray-600">
                      <Link href={item.url} target="_blank">
                        {item.name}
                      </Link>
                    </div>
                    <div className="text-sm">{item.desc}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Card>

      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-4 top-4"
            onClick={closeModal}
          >
            ✕
          </button>
          <h3 className="font-bold text-lg mb-4">申请友链</h3>

          <div className="flex flex-col gap-4">
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">名称</span>
              </div>
              <input
                type="text"
                placeholder="你的网站名称"
                className="input input-bordered w-full"
                value={values.name}
                onChange={(e) => setValues({ name: e.target.value })}
              />
            </label>

            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">地址</span>
              </div>
              <input
                type="text"
                placeholder="你的网站地址"
                className="input input-bordered w-full"
                value={values.url}
                onChange={(e) => setValues({ url: e.target.value })}
              />
            </label>

            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">头像地址</span>
              </div>
              <input
                type="text"
                placeholder="你的网站头像地址"
                className="input input-bordered w-full"
                value={values.avatar}
                onChange={(e) => setValues({ avatar: e.target.value })}
              />
            </label>

            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">描述</span>
              </div>
              <input
                type="text"
                placeholder="你的网站描述"
                className="input input-bordered w-full"
                value={values.desc}
                onChange={(e) => setValues({ desc: e.target.value })}
              />
            </label>
          </div>

          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button
                className={classNames("btn", {
                  "btn-disabled": pass,
                })}
                onClick={handleSubmit}
              >
                提交申请
              </button>
            </form>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>

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
