"use client";

import { fetchQQInfo } from "@/db/service/qq";
import { useMounted } from "@/hooks";
import { useLocalStorageState } from "ahooks";
import Image from "next/image";
import { useState } from "react";

export default function Write({
  publishCallback,
}: {
  publishCallback: (params: {
    nickname: string;
    avatar: string;
    email: string;
    content: string;
  }) => Promise<any>;
}) {
  const mounted = useMounted();

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

  const [content, setContent] = useState("");

  const onNickNameBlur = async () => {
    if (!nickname) return;
    if (!isNaN(Number(nickname))) {
      const { name, avatar, qq } = await fetchQQInfo(nickname!);
      setNickname(name);
      setAvatar(avatar);
      setEmail(`${qq}@qq.com`);
    }
  };

  const handlePublish = async () => {
    await publishCallback({
      avatar: avatar!,
      nickname: nickname!,
      content: content!,
      email: content!,
    });

    setContent("");
  };

  return (
    <div className="flex gap-5">
      <div className="pt-8">
        <div className="avatar">
          <div className="w-14">
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
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
        </div>

        <div className="flex justify-between mt-1">
          <div>
            <button className="btn text-[20px]">😊</button>
          </div>
          <button className="btn btn-primary" onClick={handlePublish}>
            发布
          </button>
        </div>
      </div>
    </div>
  );
}
