import type { CategoryData, Expense, GroupedExpenses } from "@/types/types";
import NoExpenseMessage from "./NoExpenseMessage";
import { groupExpenseByCategory } from "@/lib/utils";
import ExpenseCategoryGroup from "./ExpenseCategoryGroup";

type ExpenseSectionProps = {
  month: string;
  expenses: Expense[];
  categories: CategoryData[];
};

const ExpenseSection = async ({
  month,
  expenses,
  categories,
}: ExpenseSectionProps) => {
  const expenseCategories = categories.filter(
    (category) => !category.isFixed && category.type === "expense"
  );

  const groupedExpenses: GroupedExpenses[] = groupExpenseByCategory(
    month,
    expenses,
    expenseCategories
  );

  if (!groupedExpenses) {
    return <NoExpenseMessage />;
  }

  return (
    <ul className="flex flex-col gap-6">
      {groupedExpenses?.map((category) => (
        <li key={category.category} className="">
          <ExpenseCategoryGroup categoryData={category} />
        </li>
      ))}
    </ul>
  );
};

export default ExpenseSection;
