import { Expense } from "@/types/types";
import React from "react";
import ExpenseItem from "./ExpenseItem";
import ExpenseTableHeader from "./ExpenseTableHeader";
import { sortExpenses } from "@/lib/utils";

type ExpenseTableProps = {
  expenses: Expense[];
};

const ExpenseTable = ({ expenses }: ExpenseTableProps) => {
  if (!expenses)
    return <p className="text-xl py-2">Add your first expense below!</p>;

  const sortedExpenses = sortExpenses(expenses);
  console.log("Original: ", expenses);
  console.log("Sorted: ", sortedExpenses);

  return (
    <div className="w-full">
      <ExpenseTableHeader />
      {sortedExpenses.map((expense) => (
        <ExpenseItem key={expense.id} expense={expense} />
      ))}
    </div>
  );
};

export default ExpenseTable;
