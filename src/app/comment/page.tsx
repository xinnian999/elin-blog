"use client";

import { Card } from "@/components";
import { Comment } from "@/components";

export default function CommentPage() {
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
          <span>
            {" "}
            欢迎来到留言板! <br /> 可以在这里留言、吐槽。
          </span>
        </div>
      </Card>

      <Comment />
    </div>
  );
}
