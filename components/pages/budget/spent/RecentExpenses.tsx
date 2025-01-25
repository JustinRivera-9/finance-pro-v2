"use client";

import { Expense } from "@/types/types";
import SectionContainer from "./SectionContainer";
import SectionTitle from "./SectionTitle";
import { filterExpensesByMonthYear, sortExpenses } from "@/lib/utils";
import ExpenseRow from "./ExpenseRow";
import { useParamFilters } from "@/lib/hooks";

const emptyExpenseMessage = (
  <p className="px-6 mx-auto text-center text-lg">
    Your 10 most recent expenses for this month will be shown here
  </p>
);

const RecentExpenses = ({ expenses }: { expenses: Expense[] }) => {
  const { formattedFilter } = useParamFilters();

  // Shows 10 most recent
  const filteredExpenses = filterExpensesByMonthYear(expenses, formattedFilter);

  const sortedExpenses: Expense[] | null = sortExpenses(filteredExpenses);

  return (
    <SectionContainer>
      <div className="flex gap-4 justify-around items-baseline py-2">
        <SectionTitle>Recent Expenses</SectionTitle>
      </div>
      {!filteredExpenses?.length
        ? emptyExpenseMessage
        : sortedExpenses?.map((expense, i) => {
            if (i >= 10) return null;
            return <ExpenseRow expense={expense} key={expense.id} readOnly />;
          })}
    </SectionContainer>
  );
};

export default RecentExpenses;
