import { ReactNode } from "react";

const SectionContainer = ({ children }: { children: ReactNode }) => {
  return (
    <section className="w-full px-2 flex flex-col justify-center items-center">
      {children}
    </section>
  );
};

export default SectionContainer;
