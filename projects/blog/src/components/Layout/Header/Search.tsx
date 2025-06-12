"use client";
import { Modal } from "@/components";
import { Article } from "@/db";
import { EnterIcon, SearchIcon } from "@/icons";
import { useRequest, useUpdateEffect } from "ahooks";
import Fuse from "fuse.js";
import { useRouter } from "next/navigation";
import { useState } from "react";
import articleApi from "@/api/article";

function Search() {
  const [open, setOpen] = useState(false);

  const [q, setQ] = useState("");

  const { data } = useRequest(articleApi.getArticleList);

  const list = data?.list || [];

  const [results, setResults] = useState<Article[]>([]);

  const router = useRouter();

  useUpdateEffect(() => {
    if (q) {
      const fuse = new Fuse(list!, {
        keys: ["title", "content"], // 要搜索的字段
        includeScore: true, // 如果需要返回匹配度得分
      });

      // 获取搜索结果
      const result = fuse.search(q);

      setResults(result.map((r) => r.item)); // 提取搜索到的文章
    } else {
      setResults([]);
    }
  }, [q]);

  const go = (id: number) => {
    router.push(`/article/${id}`);
    setOpen(false);
  };

  return (
    <>
      <button
        className="btn btn-ghost btn-xs sm:btn-sm md:btn-md"
        onClick={() => setOpen(true)}
      >
        <SearchIcon className="h-8 w-8 fill-current" />
      </button>
      <Modal
        title="全站搜索"
        open={open}
        close={() => setOpen(false)}
        className="items-start pt-[10vh]"
      >
        <div>
          <div className="mb-4">
            <label className="input input-bordered flex items-center gap-2 w-full">
              <input
                type="text"
                className="grow"
                placeholder="请输入关键词"
                value={q}
                onChange={(e) => setQ(e.target.value)}
              />
              <SearchIcon className="h-8 w-8 fill-current" />
            </label>
          </div>

          {results.length ? (
            <div>
              <ul className="list bg-base rounded-box shadow-md">
                <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">
                  文章
                </li>

                {results.map((item) => {
                  return (
                    <li
                      className="list-row flex justify-between w-full overflow-hidden"
                      key={item.id}
                    >
                      <div className="flex-1 overflow-hidden">
                        <div
                          className="mb-3 cursor-pointer hover:text-primary"
                          onClick={() => go(item.id)}
                        >
                          {item.title}
                        </div>
                        <div className="text-xs uppercase font-semibold opacity-60 overflow-hidden whitespace-nowrap text-ellipsis">
                          {item.content}
                        </div>
                      </div>
                      <button
                        className="btn btn-square btn-ghost"
                        onClick={() => go(item.id)}
                      >
                        <EnterIcon />
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          ) : null}
        </div>
      </Modal>
    </>
  );
}

export default Search;
