import { ReactNode } from "react";

const SectionTitle = ({ children }: { children: ReactNode }) => {
  return (
    <h2 className="text-xl w-full flex justify-center py-2 text-accent">
      {children}
    </h2>
  );
};

export default SectionTitle;
