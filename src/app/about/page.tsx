import { Card } from "@/components";
import { getTranslations } from "next-intl/server";

export default async function About() {
  const t = await getTranslations("About");

  return (
    <div className="flex flex-col gap-6">
      <Card title={t("Title Me")}>
        <p className="mt-5">
          <b>99年，</b>河北唐山人
        </p>
        <p>
          <b>前端</b>开发一枚，工作在北京
        </p>
        <p>
          <b>爱好，</b>写代码，搞钱，旅游，金铲铲，王者荣耀
        </p>
      </Card>

      <Card title={t("Title site")}>
        <p className="mt-5">
          本站主要使用 <b>Next.js</b> + <b>daisyui</b> 编写
        </p>
      </Card>
    </div>
  );
}
