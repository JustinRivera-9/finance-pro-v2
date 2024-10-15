import { filterExpenses, formatCurrency, reduceArr } from "@/lib/utils";
import { CategoryData, Expense } from "@/types/types";

type SummaryProps = {
  expenses: Expense[];
  categories: CategoryData[];
  month: string;
};

const Summary = ({ expenses, categories, month }: SummaryProps) => {
  const filteredExpenses = filterExpenses(month, expenses);

  const totalExpenses = reduceArr(filteredExpenses!);
  const totalBudget = reduceArr(
    categories.filter((el) => el.type !== "income")
  );
  const remainingBudget = totalBudget - totalExpenses;

  return (
    <div className="flex justify-around px-6 text-center">
      <div className="bg-card py-2 px-4 rounded-lg w-2/5">
        <p className="text-xl text-light/80">Expenses</p>
        <p className="text-2xl">{formatCurrency(totalExpenses, true)}</p>
      </div>
      <div className="bg-card py-2 px-4 rounded-lg w-2/5">
        <p className="text-xl text-light/80">Remaining</p>
        <p className="text-2xl">{formatCurrency(remainingBudget, true)}</p>
      </div>
    </div>
  );
};

export default Summary;
