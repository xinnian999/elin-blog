import { getDayjs } from "@/async";
import { Card } from "@/components";
import { Article } from "@/db";
import Link from "next/link";

async function Relate({ list }: { list: Article[] }) {
  const dayjs = await getDayjs();

  return (
    <Card className="mt-6">
      <p className="text-xs">相关文章</p>

      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-5 mt-4">
          {list.map((item) => {
            return (
              <div key={item.id}>
                <Link href={`/article/${item.id}`}>
                  <div className="hover:text-primary cursor-pointer">
                    {item.title}
                  </div>
                </Link>
                <div className="text-[12px] text-gray-500">
                  {item.categoryText} / {dayjs(item.created_at).fromNow()}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Card>
  );
}

export default Relate;
