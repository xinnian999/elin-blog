import { FC, ReactNode } from "react";

interface CardProps {
  children?: ReactNode;
  className?: string;
}

const Card: FC<CardProps> = ({ children, className }) => {
  return (
    <div className="card bg-base-100 shadow-xl">
      <div className={`card-body p-6 ${className}`}>
        {/* <h2 className="card-title">Card title!</h2>
        <p>If a dog chews shoes whose shoes does he choose?</p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">Buy Now</button>
        </div> */}
        {children}
      </div>
    </div>
  );
};

export default Card;
