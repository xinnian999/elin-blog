"use server";

import { Link, getRepository } from "@/db";
import { instanceToPlain } from "class-transformer";

export const fetchLinkList = async () => {
  const postRepository = await getRepository(Link);
  const data = await postRepository.find(); // 查询所有文章

  // 直接使用 plainToClass 进行深度序列化，所有字段都会被序列化
  return instanceToPlain(data) as Link[];
};

export const createLink = async (params: Link) => {
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
