import type { Expense } from "@/types/types";
import NoExpenseMessage from "./NoExpenseMessage";
import { groupExpenseByCategory } from "@/lib/utils";
import ExpenseCategoryGroup from "./ExpenseCategoryGroup";

type ExpenseSectionProps = {
  month: string;
  expenses: Expense[];
};

const ExpenseSection = async ({ month, expenses }: ExpenseSectionProps) => {
  const groupedExpenses = groupExpenseByCategory(month, expenses);

  if (!groupedExpenses) return <NoExpenseMessage />;

  return (
    <ul className="flex flex-col gap-6">
      {groupedExpenses &&
        groupedExpenses.map((category) => (
          <li key={category.category} className="">
            <ExpenseCategoryGroup
              category={category.category}
              expenses={category.expenses}
            />
          </li>
        ))}
    </ul>
  );
};

export default ExpenseSection;
