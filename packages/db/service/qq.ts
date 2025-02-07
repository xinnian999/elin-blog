"use server";

interface QQInfo {
  code: number;
  msg: string;
  qq: number;
  name: string;
  avatar: string;
}

export const fetchQQInfo = async (qq: string) => {
  const res = await fetch(`http://api.ilingku.com/int/v1/qqname?qq=${qq}`);
  const data = await res.json();

  return data as QQInfo;
};
