"use client";
import useGlobalStore from "@/store/global";

function Message() {
  const { open, type, content } = useGlobalStore(
    (state) => state.messageProps
  );

  return (
    open && (
      <div className="toast toast-top toast-center z-[9999]">
        <div className={`alert alert-${type}`}>
          <span>{content}</span>
        </div>
      </div>
    )
  );
}

export default Message;
