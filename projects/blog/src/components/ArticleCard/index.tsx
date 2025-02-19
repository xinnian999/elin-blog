import Link from "next/link";
import { CategoryIcon, TagIcon, Card, MdRender } from "@/components";
import { Article } from "@elin-blog/db";
import { getTranslations } from "next-intl/server";
import { getDayjs } from "@/async";
import "./styles.scss";

async function ArticleCard({ data }: { data: Article }) {
  const t = await getTranslations("Home");

  const dayjs = await getDayjs();

  const lines = data.content.split('\n');
  
  // 截取前 15 行
  const content = lines.slice(0, 8).join('\n');

  return (
    <Card key={data.id}>
      <p className="text-[12px] text-gray-500 flex gap-5">
        <span>{dayjs(data.created_at).fromNow()}发表</span>
        <span className="flex gap-[2px] datas-center">
          <CategoryIcon className="scale-75" /> {data.categoryText}
        </span>

        <span className="flex gap-3 datas-center">
          {data.tags.map((tag) => (
            <span key={tag.id} className="flex gap-[2px] datas-center">
              <TagIcon className="scale-90" /> {tag.name}
            </span>
          ))}
        </span>
      </p>

      <p className="mt-2">
        <span className="text-2xl font-bold linkText">
          <Link href={`/article/${data.id}`}>{data.title}</Link>
        </span>
      </p>

      <div className="overflow-hidden w-full mb-4">
        <MdRender content={content} />
      </div>

      <div>
        <Link href={`/article/${data.id}`}>
          <button className="btn btn-xs">{t("Read More")}</button>
        </Link>
      </div>
    </Card>
  );
}

export default ArticleCard;
