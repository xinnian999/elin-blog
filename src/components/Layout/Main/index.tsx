import { FC, ReactNode } from "react";
import LeftBar from "./LeftBar";
import { getArticleArchive, getSummary } from "@/services";

interface MainProps {
  children: ReactNode;
}

const Main: FC<MainProps> = async ({ children }) => {
  const data = await getSummary();

  const { list: archives } = await getArticleArchive();

  return (
    <main className="main container z-10 relative mx-auto py-6 min-h-screen flex flex-col gap-6 lg:flex-row md:p-8">
      <div className="basis-1/4 hidden lg:block">
        <LeftBar summary={data} archives={archives} />
      </div>
      <div className="basis-3/4 flex-grow overflow-hidden"> {children} </div>
    </main>
  );
};

export default Main;
