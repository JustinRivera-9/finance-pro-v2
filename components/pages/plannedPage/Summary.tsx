import { calcTotalPlanned } from "@/lib/calculations";
import { PlannedCategories } from "@/types/types";

type SummaryProps = { categories: PlannedCategories[] };

const Summary: React.FC<SummaryProps> = ({ categories }) => {
  const totalExpenses = calcTotalPlanned(categories, "expense");
  const totalIncome = calcTotalPlanned(categories, "income");
  const underBudget = totalIncome > totalExpenses;
  const budgetDelta = totalIncome - totalExpenses;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex font-semibold gap-6 text-accent justify-center">
        <div className="bg-card px-2 py-2 rounded-lg text-left w-2/5">
          <p className="text-lg text-light">Income</p>
          <p className="text-3xl">${Math.abs(totalIncome)}</p>
        </div>
        <div className="bg-card px-4 py-2 rounded-lg text-left w-2/5">
          <p className="text-lg text-light">Expenses</p>
          <p className="text-3xl">${totalExpenses}</p>
        </div>
      </div>
      <p className="text-md w-4/5 text-center border-card border-2 mx-auto px-2 py-2 rounded-md">
        {underBudget
          ? `Doing great, you're on track to save $${budgetDelta} every month!`
          : `Looks like you're planning to spend $${budgetDelta} more than you're income.`}
      </p>
    </div>
  );
};

export default Summary;
