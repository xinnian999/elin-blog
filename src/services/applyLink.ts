"use server";

import { getRepository, Link } from "@/db";
import { instanceToPlain } from "class-transformer";

export async function applyLink(params: Link) {

  const linkRepository = await getRepository(Link);

  const link = linkRepository.create(params);

  await linkRepository.save(link);

  return { link: instanceToPlain(link), status: "success" };
}
