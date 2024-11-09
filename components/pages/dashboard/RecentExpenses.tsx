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

const emptyExpenseMessage = (
  <p className="px-6 mx-auto text-center text-lg">
    Your 10 most recent expenses for this month will be shown here
  </p>
);

const RecentExpenses = async () => {
  // Shows 10 most recent
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
      <div className="flex gap-4 justify-around items-baseline py-2">
        <SectionTitle>Recent Expenses</SectionTitle>
        <Link href="spent/november" className="min-w-fit text-sm text-light/60">
          View all <KeyboardTabIcon />
        </Link>
      </div>
      {!sortedExpenses.length
        ? emptyExpenseMessage
        : sortedExpenses.map((expense, i) => {
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
