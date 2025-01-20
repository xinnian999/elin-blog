const Footer = () => {
  return (
    <div className="bg-base-100 h-52">
      <div className="container h-full mx-auto flex items-center justify-between px-8">
        <div className="flex flex-col gap-2">
          <div className="text-2xl font-bold">Elin&apos;s Blog</div>
          <div className="text-xs">
            © 2025 iMaeGoo Powered by Hexo & Icarus
          </div>
          <div className="text-xs">总访问量 571465 次 总访客数 328849 人</div>
          <div className="text-xs">豫公网安备41010502005985 豫ICP备18017229号</div>
        </div>

        <div></div>
      </div>
    </div>
  );
};

export default Footer;
