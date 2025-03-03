import { FC, ReactNode } from "react";
import { fetchSummary, getArticleArchive } from "@elin-blog/db";
import LeftBar from "./LeftBar";

interface MainProps {
  children: ReactNode;
}

const Main: FC<MainProps> = async ({ children }) => {
  const data = await fetchSummary();

  const archives = await getArticleArchive();

  return (
    <main className="container mx-auto min-h-screen p-8 flex flex-col gap-6 lg:flex-row">
      <div className="basis-1/4">
        <LeftBar summary={data} archives={archives} />
      </div>
      <div className="basis-3/4 flex-grow overflow-hidden"> {children} </div>
    </main>
  );
};

export default Main;
