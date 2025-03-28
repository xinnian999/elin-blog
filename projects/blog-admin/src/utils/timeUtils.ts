import dayjs from "dayjs";

export const nowTime = () => {
  return dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss");
};

export const formatTime = (time: string) => {
  return dayjs(time).format("YYYY-MM-DD HH:mm:ss");
};
