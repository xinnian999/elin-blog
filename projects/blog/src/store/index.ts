import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface MessageProps {
  open: boolean;
  type?: "success" | "error" | "info";
  content: string;
}

interface UserInfo {
  nickname: string;
  avatar: string;
  email: string;
}

interface GlobalStore {
  messageProps: MessageProps;
  userInfo: UserInfo;
  likeCommentIds: number[];
  setMessageProps: (props: Partial<MessageProps>) => void;
  addLikeComment: (id: number) => void;
  setUserInfo: (userInfo: Partial<UserInfo>) => void;
}

const useStore = create(
  persist<GlobalStore>(
    (set) => ({
      messageProps: {
        open: false,
        type: "success",
        content: "",
      },
      userInfo: {
        nickname: "",
        avatar: "https://b0.bdstatic.com/0df6c8c7f109aa7b67e7cb15e6f8d025.jpg@h_1280",
        email: "",
      },
      likeCommentIds: [],
      setMessageProps: (props) => {
        set((state) => ({
          messageProps: { ...state, ...props } as MessageProps,
        }));
      },
      setUserInfo: (userInfo) => {
        set((state) => ({
          userInfo: { ...state.userInfo, ...userInfo },
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

export default useStore;
