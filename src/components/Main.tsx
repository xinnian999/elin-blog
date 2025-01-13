import { FC, ReactNode } from "react";

interface MainProps {
  children: ReactNode;
}

const Main: FC<MainProps> = ({ children }) => {
  return (
    <main className="container mx-auto min-h-screen h-screen py-8 flex gap-6">
      <div className="basis-1/4 flex-grow bg-blue-500">1/4 宽度</div>
      <div className="basis-3/4 flex-grow "> {children}</div>
    </main>
  );
};

export default Main;
