// 一个让客户端组件也能订阅主题cookie的hooks，并且支持修改同步，与服务端组件建立主题同步
import { useSyncExternalStore } from "react";
import {
  getTheme as getThemeCookie,
  setTheme as setThemeCookie,
} from "@/async";
import { useAsyncEffect } from "ahooks";

// 1. 创建外部状态管理
let theme: Theme = "light"; // 主题

let listeners: Array<() => void> = []; // 订阅的回调函数

// 订阅外部状态变化
const subscribe = (callback: () => void) => {
  listeners.push(callback);
  return () => {
    listeners = listeners.filter((listener) => listener !== callback); // 清理订阅
  };
};

// 获取当前主题
const getSnapshot = (): Theme => theme;

const setTheme = (newTheme: Theme) => {
  theme = newTheme;
  listeners.forEach((listener) => listener()); // 通知所有订阅者更新

  // 持久化主题到cookie，让服务端组件也能动态渲染
  setThemeCookie(newTheme);
};

const useTheme = () => {
  useAsyncEffect(async () => {
    // 读取cookie的持久化主题
    const cookieTheme = await getThemeCookie();
    setTheme(cookieTheme);
  }, []);

  return useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
};

useTheme.setTheme = setTheme;

export default useTheme;
