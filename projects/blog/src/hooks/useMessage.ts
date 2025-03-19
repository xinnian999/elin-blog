import useStore from "@/store";

const useMessage = () => {
  const setMessageProps = useStore((state) => state.setMessageProps);

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

  const info = (content: string) => {
    setMessageProps({
      content,
      open: true,
      type: "info",
    });

    setTimeout(() => {
      setMessageProps({ open: false });
    }, 3000);
  };

  return {
    success,
    info
  };
};

export default useMessage;
