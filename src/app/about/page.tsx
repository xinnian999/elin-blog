import { Card, Comment } from "@/components";
import { getT } from "@/async";
import { getCommentRootList } from "@/services";

export default async function About() {
  const t = await getT();

  const { list: commentList } = await getCommentRootList({
    where: {
      type: "about",
    },
    order: {
      id: "desc",
    },
  });

  return (
    <div className="flex flex-col gap-6">
      <Card title={t("Title Me")}>
        <div className="flex flex-col gap-2">
          <p className="mt-5">
            <b>99年，</b>河北唐山人
          </p>
          <p>
            <b>前端</b>开发一枚，工作在北京
          </p>
          <p>
            <b>爱好，</b>写代码，搞钱，旅游，金铲铲，王者荣耀
          </p>
        </div>
      </Card>

      <Card title={t("Title site")}>
        <div className="flex flex-col gap-2">
          <p className="mt-5">
            本站主要使用 <b>Next.js</b> + <b>daisyui</b> 编写
          </p>
        </div>
      </Card>

      <Comment type="about" initialData={commentList} />
    </div>
  );
}
