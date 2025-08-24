"use server";

export const getQQInfo = async (qq: string) => {
  const res = await fetch(`https://api.ulq.cc/int/v1/qqname?qq=${qq}`);
  const data = await res.json();

  return data;
};
