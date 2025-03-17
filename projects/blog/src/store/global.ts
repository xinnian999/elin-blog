import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface MessageProps {
  open: boolean;
  type?: "success" | "error" | "info";
  content: string;
}
interface GlobalStore {
  messageProps: MessageProps;
  likeCommentIds: number[];
  setMessageProps: (props: Partial<MessageProps>) => void;
  addLikeComment: (id: number) => void;
}

const useGlobalStore = create(
  persist<GlobalStore>(
    (set) => ({
      messageProps: {
        open: false,
        type: "success",
        content: "",
      },
      likeCommentIds: [],
      setMessageProps: (props) => {
        set((state) => ({
          messageProps: { ...state, ...props } as MessageProps,
        }));
      },
      addLikeComment: (id) => {
        set((state) => {
          return {
            likeCommentIds: [...state.likeCommentIds, id],
          };
        });
      },
    }),
    {
      name: "global", // unique name
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    }
  )
);

export default useGlobalStore;
