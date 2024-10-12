import type { Expense } from "@/types/types";
import NoExpenseMessage from "./NoExpenseMessage";
import { groupExpenseByCategory } from "@/lib/utils";

type ExpenseSectionProps = {
  month: string;
  expenses: Expense[];
};

const ExpenseSection = async ({ month, expenses }: ExpenseSectionProps) => {
  const filteredExpenses = expenses.filter(
    (expense) => expense.date.split(" ")[0] === month
  );

  if (!filteredExpenses.length) return <NoExpenseMessage />;

  const groupedExpenses = groupExpenseByCategory(filteredExpenses);
  console.log(groupedExpenses);

  return (
    <section>
      <div>Expense Section</div>
      <div>Selected Month: {month}</div>
    </section>
  );
};

export default ExpenseSection;
