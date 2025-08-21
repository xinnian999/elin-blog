function Arert({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-4">
      <div role="alert" className="alert alert-info alert-soft my-5">
        <span className="leading-8">{children}</span>
      </div>
    </div>
  );
}

export default Arert;
