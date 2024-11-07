import { Expense } from "@/types/types";
import SectionContainer from "./SectionContainer";
import SectionTitle from "./SectionTitle";
import { formatCurrency, sortExpenses } from "@/lib/utils";
import { getExpenses } from "@/app/app/spent/[month]/actions";
import ExpenseItem from "../spent/ExpenseItem";
import ExpenseTableHeader from "../spent/ExpenseTableHeader";

const RecentExpenses = async () => {
  // Show 10 most recent. "View All" button that links to expenses page
  const expenses: { expenses: Expense[]; error: null | string } =
    await getExpenses();

  const sortedExpenses: Expense[] = sortExpenses(expenses.expenses);

  return (
    <SectionContainer>
      <SectionTitle>Recent Expenses</SectionTitle>
      <div className="grid grid-cols-[1fr_0.75fr_2.5fr] min-w-[90%] gap-2 justify-between text-secondary py-2">
        <p>Date</p>
        <p>Amount</p>
        <p>Description</p>
      </div>
      {sortedExpenses.map((expense) => (
        <section
          key={expense.id}
          className="grid grid-cols-[1fr_0.75fr_2.5fr] min-w-[90%] gap-4 py-2 pl-2 border-t border-light/30"
        >
          <p>{expense.date}</p>
          <p>{formatCurrency(expense.amount, true)}</p>
          <p className="truncate w-44">{expense.description}</p>
        </section>
      ))}
    </SectionContainer>
  );
};

export default RecentExpenses;
