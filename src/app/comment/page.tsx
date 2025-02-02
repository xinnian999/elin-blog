"use client";

import { Card } from "@/components";
import { fetchQQInfo } from "@/db/service/qq";
import { useMounted } from "@/hooks";
import { useLocalStorageState } from "ahooks";
import Image from "next/image";

export default function About() {
  const [nickname, setNickname] = useLocalStorageState("nickname", {
    defaultValue: "",
  });

  const [avatar, setAvatar] = useLocalStorageState("avatar", {
    defaultValue:
      "https://b0.bdstatic.com/0df6c8c7f109aa7b67e7cb15e6f8d025.jpg@h_1280",
  });

  const [email, setEmail] = useLocalStorageState("email", {
    defaultValue: "",
  });

  const onNickNameBlur = async () => {
    if (!nickname) return;
    if (!isNaN(Number(nickname))) {
      const { name, avatar, qq } = await fetchQQInfo(nickname!);
      setNickname(name);
      setAvatar(avatar);
      setEmail(`${qq}@qq.com`);
    }
  };

  const mounted = useMounted();

  return (
    <div className="flex flex-col gap-6">
      <Card title="留言板">
        <div role="alert" className="alert mt-5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="stroke-info h-6 w-6 shrink-0"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          <span> 欢迎来到留言板! <br/>  可以在这里留言、吐槽。</span>
        </div>
      </Card>

      <Card>
        <div className="flex gap-5">
          <div className="pt-8">
            <div className="avatar">
              <div className="w-20">
                {mounted && (
                  <Image src={avatar!} fill alt="" className="rounded-xl" />
                )}
              </div>
            </div>
          </div>
          <div className="flex-1">
            <div className="flex gap-3">
              <label className="form-control  max-w-xs">
                <div className="label">
                  <span className="label-text">昵称 / QQ号</span>
                </div>
                <input
                  type="text"
                  placeholder="可根据qq自动获取昵称"
                  className="input input-bordered  max-w-xs input-sm"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  onBlur={onNickNameBlur}
                />
              </label>

              <label className="form-control w-72">
                <div className="label">
                  <span className="label-text">邮箱</span>
                </div>
                <input
                  type="text"
                  placeholder="用于接收回复通知"
                  className="input input-bordered w-full input-sm"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </label>
            </div>

            <div className="mt-3">
              <textarea
                placeholder="留言点什么吧～"
                className="textarea textarea-bordered textarea-md w-full"
                rows={3}
              ></textarea>
            </div>

            <div className="flex justify-between mt-1">
              <div>
                <button className="btn text-[20px]">😊</button>
              </div>
              <button className="btn btn-primary">发布</button>
            </div>
          </div>
        </div>

        <div className="divider"></div>

        <div>
          共120条留言
        </div>
      </Card>
    </div>
  );
}
