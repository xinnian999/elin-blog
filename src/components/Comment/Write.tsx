"use client";

import { useLang, useMounted, useTheme } from "@/hooks";
import Image from "next/image";
import { useState } from "react";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import classNames from "classnames";
import en from "@emoji-mart/data/i18n/en.json";
import zh from "@emoji-mart/data/i18n/zh.json";
import "./write.css";
import { Popover } from "antd";
import useStore from "@/store";
import qqApi from "@/api/qq";

const locales = {
  en,
  zh,
};

export default function Write({
  publishCallback,
  placeholder = "留言点什么吧～",
  id,
}: {
  placeholder?: string;
  top?: boolean;
  id?: number;
  publishCallback: (params: {
    nickname: string;
    avatar: string;
    email?: string;
    content: string;
  }) => Promise<any>;
}) {
  const mounted = useMounted();

  const lang = useLang();

  const { nickname, avatar, email } = useStore((state) => state.userInfo);

  const setUserInfo = useStore((state) => state.setUserInfo);

  const [content, setContent] = useState("");

  const theme = useTheme();

  const onNickNameBlur = async () => {
    if (!nickname) return;
    if (!isNaN(Number(nickname))) {
      const { name, avatar, qq } = await qqApi.fetchQQInfo(nickname!);
      setUserInfo({ nickname: name, avatar, email: `${qq}@qq.com` });
    }
  };

  const handlePublish = async () => {
    await publishCallback({
      avatar,
      nickname,
      content,
      email,
    });

    setContent("");
  };

  const onEmojiSelect = (e: { native: string }) => {
    setContent(content + e.native);
  };

  return (
    <div className="flex gap-2 w-full lg:gap-5">
      <div className="">
        <div className="avatar">
          <div className="w-10 lg:w-14">
            {mounted && (
              <Image src={avatar} fill alt="" className="rounded-xl" />
            )}
          </div>
        </div>
      </div>
      <div className="flex-1">
        <div className="flex gap-3 flex-col lg:flex-row">
          <label className="input input-sm flex-1">
            <span className="label">昵称 / QQ号</span>
            <input
              type="text"
              placeholder="可根据qq自动获取昵称"
              className="w-full"
              value={nickname}
              onChange={(e) => setUserInfo({ nickname: e.target.value })}
              onBlur={onNickNameBlur}
            />
          </label>

          <label className="input input-sm flex-1">
            <span className="label">邮箱</span>
            <input
              type="text"
              placeholder="用于接收回复通知"
              className="w-full"
              value={email}
              onChange={(e) => setUserInfo({ email: e.target.value })}
            />
          </label>
        </div>

        <div className="mt-2 mb-2">
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
            <Popover
              content={
                <Picker
                  data={data}
                  theme={theme}
                  i18n={locales[lang]}
                  onEmojiSelect={onEmojiSelect}
                />
              }
              trigger="click"
              destroyTooltipOnHide
            >
              <button
                className={classNames("btn btn-sm text-[20px] bg-base-300")}
                popoverTarget={`popover-${id}`}
              >
                😊
              </button>
            </Popover>
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
