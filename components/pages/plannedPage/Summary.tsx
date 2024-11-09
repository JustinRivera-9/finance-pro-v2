import { calcTotalPlanned } from "@/lib/calculations";
import { formatCurrency } from "@/lib/utils";
import type { CategoryData } from "@/types/types";

type SummaryProps = { categories: CategoryData[] };

const Summary: React.FC<SummaryProps> = ({ categories }) => {
  const totalExpenses = calcTotalPlanned(categories, "expense");
  const totalIncome = calcTotalPlanned(categories, "income");
  const underBudget = totalIncome > totalExpenses;
  const budgetDelta = Math.abs(totalIncome - totalExpenses);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex font-semibold gap-6 text-accent justify-center">
        <div className="bg-card px-2 py-2 rounded-lg text-left w-2/5">
          <p className="text-lg text-light">Income</p>
          <p className="text-3xl">
            {totalIncome
              ? formatCurrency(totalIncome, true)
              : formatCurrency(0, true)}
          </p>
        </div>
        <div className="bg-card px-4 py-2 rounded-lg text-left w-2/5">
          <p className="text-lg text-light">Expenses</p>
          <p className="text-3xl">
            {totalExpenses
              ? formatCurrency(totalExpenses, true)
              : formatCurrency(0, true)}
          </p>
        </div>
      </div>
      <p
        className={`${
          !underBudget && "text-error"
        } text-md w-4/5 text-center border-card border-2 mx-auto px-2 py-2 rounded-md`}
      >
        {underBudget
          ? `Doing great, you're on track to save ${formatCurrency(
              budgetDelta,
              true
            )} every month!`
          : `Looks like you're planning to spend ${formatCurrency(
              budgetDelta,
              true
            )} more than your income.`}
      </p>
    </div>
  );
};

export default Summary;
