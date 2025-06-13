import Link from "next/link";
import { Card, MdRender } from "@/components";
import { Article } from "@/db";
import { getDayjs, getT } from "@/async";
import "./styles.scss";
import { CategoryIcon, TagIcon } from "@/icons";

async function ArticleCard({ data }: { data: Article }) {
  const t = await getT();

  const dayjs = await getDayjs();

  const lines = data.content.split("\n");

  // 截取前 15 行
  const content = lines.slice(0, 8).join("\n");

  return (
    <Card key={data.id}>
      <p className="text-[12px] text-gray-500 flex gap-5">
        <span>{dayjs(data.created_at).fromNow()}发表</span>
        <Link href={`/category/${data.categoryId}`}>
          <span className="flex gap-[2px] datas-center hover:text-primary">
            <CategoryIcon className="scale-75" /> {data.categoryText}
          </span>
        </Link>

        <span className="flex gap-3 datas-center">
          {data.tags.map((tag) => (
            <Link href={`/tag/${tag.id}`} key={tag.id}>
              <span className="flex gap-[2px] datas-center hover:text-primary">
                <TagIcon className="scale-90" /> {tag.name}
              </span>
            </Link>
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
