"use client";

import { fetchQQInfo } from "@elin-blog/db";
import { useMounted, useTheme } from "@/hooks";
import { useLocalStorageState } from "ahooks";
import Image from "next/image";
import { useState } from "react";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import classNames from "classnames";
import en from "@emoji-mart/data/i18n/en.json";
import zh from "@emoji-mart/data/i18n/zh.json";
import { useLocale } from "next-intl";

const locales = {
  en,
  zh,
};

export default function Write({
  publishCallback,
  placeholder = "留言点什么吧～",
}: {
  placeholder?: string;
  publishCallback: (params: {
    nickname: string;
    avatar: string;
    email: string;
    content: string;
  }) => Promise<any>;
}) {
  const mounted = useMounted();

  const lang = useLocale() as Lang;

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

  const theme = useTheme();

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

  const onEmojiSelect = (e: { native: string }) => {
    setContent(content + e.native);
  };

  return (
    <div className="flex gap-5 w-full">
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
          <label className="form-control w-1/2">
            <div className="label">
              <span className="label-text">昵称 / QQ号</span>
            </div>
            <input
              type="text"
              placeholder="可根据qq自动获取昵称"
              className="input input-bordered w-full input-sm"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              onBlur={onNickNameBlur}
            />
          </label>

          <label className="form-control  w-1/2">
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
            placeholder={placeholder}
            className="textarea textarea-bordered textarea-md w-full"
            rows={3}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
        </div>

        <div className="flex justify-between mt-1">
          <div>
            <details className="dropdown">
              <summary className="btn btn-sm text-[20px] bg-base-300">😊</summary>
              <ul className="dropdown-content bg-base-100 rounded-box z-[1] shadow">
                <Picker
                  data={data}
                  theme={theme}
                  i18n={locales[lang]}
                  onEmojiSelect={onEmojiSelect}
                />
              </ul>
            </details>
          </div>
          <button
            className={classNames("btn", "btn-primary", "btn-sm", {
              "btn-disabled": !content || !nickname || !email,
            })}
            onClick={handlePublish}
          >
            发布
          </button>
        </div>
      </div>
    </div>
  );
}
