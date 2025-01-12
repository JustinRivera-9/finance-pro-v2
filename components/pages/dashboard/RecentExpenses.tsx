import { Expense } from "@/types/types";
import SectionContainer from "./SectionContainer";
import SectionTitle from "./SectionTitle";
import { getCurrentMonthAndYear, sortExpenses } from "@/lib/utils";
import { getExpenses } from "@/app/app/budget/actions";
import Link from "next/link";
import KeyboardTabIcon from "@mui/icons-material/KeyboardTab";
import ReadOnlyExpenseRow from "./ReadOnlyExpenseRow";

const emptyExpenseMessage = (
  <p className="px-6 mx-auto text-center text-lg">
    Your 10 most recent expenses for this month will be shown here
  </p>
);

const RecentExpenses = async () => {
  // Shows 10 most recent
  // @ts-ignore
  const expenses: { expenses: Expense[]; error: null | string } =
    await getExpenses();

  const currentMonth = getCurrentMonthAndYear();
  const filteredExpenses = expenses.expenses.filter((expense) => {
    const [month, day, year] = expense.date.split("/");
    return [month, year].join("/") === currentMonth;
  });

  const sortedExpenses: Expense[] | null = sortExpenses(filteredExpenses);

  return (
    <SectionContainer>
      <div className="flex gap-4 justify-around items-baseline py-2">
        <SectionTitle>Recent Expenses</SectionTitle>
        <Link href="spent/november" className="min-w-fit text-sm text-light/60">
          View all <KeyboardTabIcon />
        </Link>
      </div>
      {!filteredExpenses?.length
        ? emptyExpenseMessage
        : sortedExpenses?.map((expense, i) => {
            if (i >= 10) return null;

            return <ReadOnlyExpenseRow expense={expense} key={expense.id} />;
          })}
    </SectionContainer>
  );
};

export default RecentExpenses;
