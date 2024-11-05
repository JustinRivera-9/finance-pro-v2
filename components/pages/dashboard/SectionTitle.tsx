import { ReactNode } from "react";

const SectionTitle = ({ children }: { children: ReactNode }) => {
  return (
    <h2 className="text-2xl w-full flex justify-center text-light font-bold">
      {children}
    </h2>
  );
};

export default SectionTitle;
