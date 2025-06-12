"use client";
import useStore from "@/store";
import classNames from "classnames";

function Message() {
  const { open, type, content } = useStore((state) => state.messageProps);

  return (
    open && (
      <div className="toast toast-top toast-center z-[9999]">
        <div
          className={classNames("alert", {
            "alert-success": type === "success",
            "alert-info": type === "info",
            "alert-error": type === "error",
          })}
        >
          <span>{content}</span>
        </div>
      </div>
    )
  );
}

export default Message;
