import { Expense } from "@/types/types";
import React from "react";
import ExpenseItem from "./ExpenseItem";
import ExpenseTableHeader from "./ExpenseTableHeader";

type ExpenseTableProps = {
  expenses: Expense[];
};

const ExpenseTable = ({ expenses }: ExpenseTableProps) => {
  if (!expenses)
    return <p className="text-xl py-2">Add your first expense below!</p>;

  return (
    <div className="w-full">
      <ExpenseTableHeader />
      {expenses.map((expense) => (
        <ExpenseItem key={expense.id} expense={expense} />
      ))}
    </div>
  );
};

export default ExpenseTable;
