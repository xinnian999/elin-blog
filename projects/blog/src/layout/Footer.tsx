import { fetchVisits } from "@elin-blog/db";

const Footer = async () => {
  const visits = await fetchVisits();

  return (
    <div className="bg-base h-52 z-10 relative">
      <div className="container h-full mx-auto flex items-center justify-between px-8">
        <div className="flex flex-col gap-2">
          <div className="text-2xl font-bold">Elin&apos;s Blog</div>
          <div className="text-xs">© 2025 Elin Powered by Hexo & Icarus</div>
          <div className="text-xs">
            总访问量 {visits} 次 总访客数 {visits} 人
          </div>
          <div className="text-xs">冀ICP备2025100393号-1</div>
        </div>

        <div></div>
      </div>
    </div>
  );
};

export default Footer;
