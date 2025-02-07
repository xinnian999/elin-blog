"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const loginAdmin = async ({
  username,
  password,
}: {
  password: string;
  username: string;
}) => {
  if (username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD) {
    // 登录成功，设置 Cookie
    (await cookies()).set("auth", "true", { maxAge: 60 * 60 }); // 1 小时有效期
    return true;
  } else {
    return Promise.reject("用户名或密码错误");
  }
};

export const checkAuth = async () => {
  const auth = (await cookies()).get("auth");

  if (auth) {
    return true;
  } else {
    return Promise.reject("登录过期");
  }
};

export const logout = async () => {
  // 清除 Cookie
  (await cookies()).delete("auth");
  redirect("/login");
};
