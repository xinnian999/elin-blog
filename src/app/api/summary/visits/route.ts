import { getRepository, Visit } from "@/db";

export async function GET() {
  const postRepository = await getRepository(Visit);

  let visitStat = await postRepository.findOneBy({ id: 1 });

  if (!visitStat) {
    // 如果没有记录，创建新的访问记录
    visitStat = new Visit();
    visitStat.visits = 0;
    await postRepository.save(visitStat);
  }

  // 更新访问次数
  visitStat.visits += 1;
  await postRepository.save(visitStat);

  return Response.json({ visits: visitStat.visits });
}
