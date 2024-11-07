import { ReactNode } from "react";

const SectionTitle = ({ children }: { children: ReactNode }) => {
  return (
    <h2 className="text-2xl w-full flex justify-center text-accent font-bold">
      {children}
    </h2>
  );
};

export default SectionTitle;
