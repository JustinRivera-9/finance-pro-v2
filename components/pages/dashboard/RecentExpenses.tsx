import { Expense } from "@/types/types";
import SectionContainer from "./SectionContainer";
import SectionTitle from "./SectionTitle";
import {
  formatCurrency,
  getCurrentMonthAndYear,
  sortExpenses,
} from "@/lib/utils";
import { getExpenses } from "@/app/app/spent/[month]/actions";
import Link from "next/link";
import KeyboardTabIcon from "@mui/icons-material/KeyboardTab";

const RecentExpenses = async () => {
  // Show 10 most recent. "View All" button that links to expenses page
  const expenses: { expenses: Expense[]; error: null | string } =
    await getExpenses();

  const currentMonth = getCurrentMonthAndYear();
  const filteredExpenses = expenses.expenses.filter((expense) => {
    const [month, day, year] = expense.date.split("/");
    return [month, year].join("/") === currentMonth;
  });
  const sortedExpenses: Expense[] = sortExpenses(filteredExpenses);

  return (
    <SectionContainer>
      <div className="flex gap-4 justify-around items-baseline">
        <SectionTitle>Recent Expenses</SectionTitle>
        <Link href="spent/november" className="min-w-fit text-sm text-light/60">
          View all <KeyboardTabIcon />
        </Link>
      </div>
      <div className="grid grid-cols-[1fr_0.75fr_2.5fr] min-w-[90%] gap-2 justify-between text-secondary py-2">
        <p>Date</p>
        <p>Amount</p>
        <p>Description</p>
      </div>
      {sortedExpenses.map((expense, i) => {
        if (i >= 10) return null;

        return (
          <section
            key={expense.id}
            className="grid grid-cols-[1fr_0.75fr_2.5fr] min-w-[90%] gap-4 py-2 pl-2 border-t border-light/30"
          >
            <p>{expense.date}</p>
            <p>{formatCurrency(expense.amount, true)}</p>
            <p className="truncate w-44">{expense.description}</p>
          </section>
        );
      })}
    </SectionContainer>
  );
};

export default RecentExpenses;
