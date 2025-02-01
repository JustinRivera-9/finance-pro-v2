import { Box } from "lucide-react";
import Image from "next/image";

const Benefits = () => {
  return (
    <div className="flex flex-col gap-2 text-center">
      <div className="flex justify-center items-center">
        <Image
          alt="light bulb with question marks"
          src="/features/light-bulb.png"
          width={100}
          height={100}
        />
        <h1 className="text-4xl text-center text-light">Why it matters</h1>
      </div>
      {/* <h2 className="text-lg text-light/60">
        Financial health is essential for creating a secure and balanced future,
        allowing you to live with confidence and make informed financial
        decisions.
      </h2> */}
      <ul className="flex flex-col text-left gap-4 pt-4">
        {/* <ul className="grid grid-cols- gap-2 pt-4"> */}
        <li className="flex gap-4">
          <Box size={24} className="text-secondary" />
          Build a secure financial future
        </li>
        <li className="flex gap-4">
          <Box size={24} className="text-secondary" />
          Achieve goals with smarter decisions
        </li>
        <li className="flex gap-4">
          <Box size={24} className="text-secondary" />
          Reduce stress from money challenges
        </li>
        <li className="flex gap-4">
          <Box size={24} className="text-secondary" />
          Adapt better to life changes
        </li>
        <li className="flex gap-4">
          <Box size={24} className="text-secondary" />
          Maximize potential wealth growth
        </li>
      </ul>
    </div>
  );
};

export default Benefits;
