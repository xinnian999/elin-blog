"use server";
import { Comment } from "@/db";
import { headers } from "next/headers";
import { UAParser } from "ua-parser-js";

const isIPv4 = (ip: string) => {
  return /^(25[0-5]|2[0-4]\d|1\d{2}|\d{1,2})\.(25[0-5]|2[0-4]\d|1\d{2}|\d{1,2})\.(25[0-5]|2[0-4]\d|1\d{2}|\d{1,2})\.(25[0-5]|2[0-4]\d|1\d{2}|\d{1,2})$/.test(
    ip
  );
};

const setCommentInfo = async (comment: Comment) => {
  const headersList = await headers();
  const ip = headersList.get("x-forwarded-for");

  const userAgent = headersList.get("user-agent");

  if (isIPv4(ip!)) {
    const response = await fetch(`http://ip-api.com/json/${ip}?lang=zh-CN`);

    const data = await response.json();

    comment.ip = data.query;
    comment.country = data.country;
    comment.region = data.regionName;
    comment.city = data.city;
  }

  if (userAgent) {
    const ua = UAParser(userAgent);
    comment.browser = `${ua.browser.name} ${ua.browser.version}`;
    comment.os = `${ua.os.name} ${ua.os.version}`;
  }
};

export default setCommentInfo;
