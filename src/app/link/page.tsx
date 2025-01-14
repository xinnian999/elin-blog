import { Card } from "@/components";

export default function About() {
  return (
    <div className="flex flex-col gap-6">
      <Card title="关于我">
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

      <Card title="关于本站">
        <p className="mt-5">
          本站主要使用 <b>Next.js</b> + <b>daisyui</b> 编写
        </p>
      </Card>
    </div>
  );
}
