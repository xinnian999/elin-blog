"use server";

import { Link, getRepository } from "@/db";
import { instanceToPlain } from "class-transformer";
import { LinkStatus } from "../enums";
import { sendEmail } from "./utils";

export const fetchLinkList = async () => {
  const postRepository = await getRepository(Link);
  const data = await postRepository.find(); // 查询所有文章

  // 直接使用 plainToClass 进行深度序列化，所有字段都会被序列化
  return instanceToPlain(data) as Link[];
};

export const fetchLinkListByPass = async () => {
  const postRepository = await getRepository(Link);

  const data = await postRepository
    .createQueryBuilder("link")
    .where("link.status = :status", {
      status: LinkStatus["审核通过"].toString(),
    })
    .orderBy("RAND()")
    .getMany();

  return instanceToPlain(data) as Link[];
};

export const createLink = async (params: Link) => {
  console.log(params);
  
  const postRepository = await getRepository(Link);
  
  const link = postRepository.create(params);

  await postRepository.save(link);

  return;
};

export const passLink = async (id: number) => {
  const postRepository = await getRepository(Link);
  const link = await postRepository.findOneBy({ id });

  if (link) {
    link.status = 2;
    await postRepository.save(link);

    if (link.email) {
      sendEmail(
        link.email,
        `
        <p>你的友链申请已通过审核</p>
        <br/>
        <p>点击<a href="https://elin521.cn/link">前往查看</a></p>
        <br/>
        <p>—— 来自 <a href="https://elin521.cn">Elin's Blog</a></p>
      `
      );
    }
  }

  return;
};

export const refuseLink = async (id: number) => {
  const postRepository = await getRepository(Link);
  const link = await postRepository.findOneBy({ id });

  if (link) {
    link.status = 1;
    await postRepository.save(link);
  }

  return;
};

export const deleteLink = async (id: number) => {
  const postRepository = await getRepository(Link);
  await postRepository.delete(id);

  return;
};
