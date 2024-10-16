import { Expense } from "@/types/types";
import React from "react";
import ExpenseItem from "./ExpenseItem";
import ExpenseTableHeader from "./ExpenseTableHeader";

type ExpenseTableProps = {
  expenses: Expense[];
};

const ExpenseTable = ({ expenses }: ExpenseTableProps) => {
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
