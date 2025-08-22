import { getVisits } from "@/services";

const Footer = async () => {
  const visits = await getVisits();

  return (
    <div className="bg-base z-10 relative">
      <div className="container h-full mx-auto flex flex-col gap-3 items-center justify-between py-5 text-[14px] lg:flex-row">
        <div>
          <span>© 2023 - 2025 Powered by Elin</span>
        </div>

        <div className="flex gap-4">
          <span>总访问量 {visits}次</span>
          <span>冀ICP备2025100393号-1</span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
