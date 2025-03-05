import useMessageStore from "@/store/global";

const useMessage = () => {
  const setMessageProps = useMessageStore((state) => state.setMessageProps);

  const success = (content: string) => {
    setMessageProps({
      content,
      open: true,
      type: "success",
    });

    setTimeout(() => {
      setMessageProps({ open: false });
    }, 3000);
  };

  return {
    success,
  };
};

export default useMessage;
