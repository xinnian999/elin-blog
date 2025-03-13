import { create } from "zustand";

interface MessageProps {
  open: boolean;
  type?: "success";
  content: string;
}
interface GlobalStore {
  messageProps: MessageProps;
  setMessageProps: (props: Partial<MessageProps>) => void;
}

const useGlobalStore = create<GlobalStore>((set) => ({
  messageProps: {
    open: false,
    type: "success",
    content: "",
  },
  setMessageProps: (props) => {
    set((state) => ({ messageProps: { ...state, ...props } as MessageProps }));
  },
}));

export default useGlobalStore;
