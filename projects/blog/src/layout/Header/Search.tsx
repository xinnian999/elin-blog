"use client";
import { Modal } from "@/components";
import { fetchArticleList } from "@elin-blog/db";
import { SearchIcon } from "@elin-blog/icons";
import { useRequest } from "ahooks";
import Fuse from "fuse.js";
import { useState } from "react";

function Search() {
  const [open, setOpen] = useState(false);

  useRequest(fetchArticleList, {
    onSuccess(data) {
      console.log(data);

      const fuse = new Fuse(data!, {
        keys: ["title", "content"], // 要搜索的字段
        includeScore: true, // 如果需要返回匹配度得分
      });

      // 获取搜索结果
      const result = fuse.search("笔记");

      console.log(result);

      //   setResults(result.map((r) => r.item)); // 提取搜索到的文章
    },
  });

  return (
    <>
      <button className="btn btn-ghost" onClick={() => setOpen(true)}>
        <SearchIcon className="h-8 w-8 fill-current" />
      </button>
      <Modal title="全站搜索" open={open} close={() => setOpen(false)} className="items-start pt-[10vh]">
        <div>
          <div>
            <label className="input input-bordered flex items-center gap-2 w-full">
              <input type="text" className="grow" placeholder="Search" />
              <SearchIcon className="h-8 w-8 fill-current" />
            </label>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default Search;
