"use client";
import { Expense } from "@/types/types";
import CategoryHeader from "./CategoryHeader";
import ExpenseTable from "./ExpenseTable";
import { useState } from "react";
import ProgressBar from "./ProgressBar";
import { AddExpenseBtn } from "./AddExpenseBtn";

type ExpenseCategoryGroupProps = {
  category: string;
  expenses: Expense[];
};

const ExpenseCategoryGroup = ({
  category,
  expenses,
}: ExpenseCategoryGroupProps) => {
  const [tableOpen, setTableOpen] = useState<boolean>(false);

  return (
    <div className="flex flex-col items-start gap-2 bg-card mx-4 rounded-xl p-4">
      <CategoryHeader category={category} />
      <div className="flex w-full gap-4 items-center">
        <ProgressBar expenses={expenses} />
        <button
          className="rounded-full bg-page text-accent h-8 w-8 font-extrabold"
          onClick={() => setTableOpen((prev) => !prev)}
        >
          {tableOpen ? "-" : "+"}
        </button>
      </div>
      {tableOpen && <ExpenseTable expenses={expenses} />}
      {tableOpen && <AddExpenseBtn category={category} />}
    </div>
  );
};

export default ExpenseCategoryGroup;
