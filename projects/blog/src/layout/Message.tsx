"use client";
import useMessageStore from "@/store/global";

function Message() {
  const { open, type, content } = useMessageStore(
    (state) => state.messageProps
  );

  return (
    open && (
      <div className="toast toast-top toast-center z-30">
        <div className={`alert alert-${type}`}>
          <span>{content}</span>
        </div>
      </div>
    )
  );
}

export default Message;
