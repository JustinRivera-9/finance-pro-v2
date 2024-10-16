import { formatCurrency } from "@/lib/utils";
import { Expense } from "@/types/types";

type ProgressBarProps = {
  expenses: Expense[];
};

const ProgressBar = ({ expenses }: ProgressBarProps) => {
  return (
    <div className="w-full border border-card rounded-full bg-light/80">
      <div className="flex items-center justify-end h-6 rounded-2xl bg-accent w-[50%] text-dark font-bold text-right pr-6">
        {formatCurrency(52.45, true)}
      </div>
    </div>
  );
};

export default ProgressBar;
