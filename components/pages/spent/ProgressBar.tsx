import { formatCurrency, reduceArr } from "@/lib/utils";
import { Expense } from "@/types/types";

type ProgressBarProps = {
  expenses: Expense[];
  budget: number;
};

const ProgressBar = ({ expenses, budget }: ProgressBarProps) => {
  const totalExpenses = reduceArr(expenses);
  const percentToBudget = (totalExpenses / budget) * 100;
  const width = percentToBudget > 100 ? 100 : (totalExpenses / budget) * 100;

  const underBudget = percentToBudget > 100 ? false : true;

  return (
    <div className="w-full border border-card rounded-full bg-light/80">
      <div
        className={`flex items-center justify-end h-6 rounded-2xl bg-accent text-dark font-bold text-right`}
        style={{
          width: `${width}%`,
          backgroundColor: `${underBudget ? "#84cc16" : "#f87272"}`,
          color: `${percentToBudget > 20 ? "#262525" : "transparent"}`,
          paddingRight: `${width === 0 ? "0px" : "1.5rem"}`,
        }}
      >
        {formatCurrency(totalExpenses, true)}
      </div>
    </div>
  );
};

export default ProgressBar;
