"use client";
import { Card } from "@/components";

export default function About() {
  return (
    <div className="flex flex-col gap-6">
      <Card title="友情链接">
        <div className="mt-4">
          <button
            className="btn btn-primary"
            onClick={() => document.getElementById("my_modal_1")?.showModal()}
          >
            申请友链
          </button>
          <dialog id="my_modal_1" className="modal">
            <div className="modal-box">
              <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn btn-sm btn-circle btn-ghost absolute right-4 top-4">
                  ✕
                </button>
              </form>
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
                  />
                </label>
              </div>

              <div className="modal-action">
                <form method="dialog">
                  {/* if there is a button in form, it will close the modal */}
                  <button className="btn">提交申请</button>
                </form>
              </div>
            </div>
          </dialog>
        </div>
      </Card>
    </div>
  );
}
