import classNames from "classnames";
import { FC, ReactNode } from "react";

interface CardProps {
  children?: ReactNode;
  className?: string;
  title?: string;
}

const Card: FC<CardProps> = ({ children, className, title }) => {
  return (
    <div className={classNames(`card shadow-xl bg-base rounded-none md:rounded-lg`, className)}>
      <div className={`card-body p-6`}>
        {title && <h2 className="card-title">{title}</h2>}
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Card;
