import request from "./request";

const fetchQQInfo = async (qq: string) => {
  const res = await request({
    path: "/qq/info",
    method: "GET",
    params: {
      qq,
    },
  });

  return res as {
    code: number;
    msg: string;
    qq: number;
    name: string;
    avatar: string;
  };
};

export default {
  fetchQQInfo,
};
