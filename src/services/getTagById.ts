import { Tag, getRepository } from "@/db";

export async function getTagById(tagId: number) {
  const tagRepository = await getRepository(Tag);

  if (isNaN(Number(tagId))) {
    return null;
  }

  const tag = await tagRepository.findOne({
    where: { id: Number(tagId) },
  });

  if (!tag) {
    return null;
  }

  return tag;
}
