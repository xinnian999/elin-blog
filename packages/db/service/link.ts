"use server";

import { Link,  getRepository } from "@elin-blog/db";
import { instanceToPlain } from "class-transformer";
import { LinkStatus } from "../enums";

export const fetchLinkList = async () => {
  const postRepository = await getRepository(Link);
  const data = await postRepository.find(); // 查询所有文章

  // 直接使用 plainToClass 进行深度序列化，所有字段都会被序列化
  return instanceToPlain(data) as Link[];
};

export const fetchLinkListByPass = async () => {
  const postRepository = await getRepository(Link);

  const data = await postRepository.find({ where: { status: LinkStatus['审核通过'].toString() as any } }); // 查询所有通过的友联


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
