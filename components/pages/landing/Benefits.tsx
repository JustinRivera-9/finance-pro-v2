import { Box } from "lucide-react";

const Benefits = () => {
  return (
    <div className="flex flex-col gap-4 text-center">
      <h1 className="text-3xl text-accent text-center">
        Why Personal <br />
        Finance Matters
      </h1>
      <h2 className="text-lg">
        Financial health is essential for creating a secure and balanced future,
        allowing you to live with confidence and make informed financial
        decisions.
      </h2>
      <ul className="flex flex-col gap-2">
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
