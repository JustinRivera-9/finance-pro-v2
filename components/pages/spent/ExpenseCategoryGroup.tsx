"use client";
import { GroupedExpenses } from "@/types/types";
import CategoryHeader from "./CategoryHeader";
import ExpenseTable from "./ExpenseTable";
import { useState } from "react";
import ProgressBar from "./ProgressBar";
import { AddExpenseBtn } from "./AddExpenseBtn";
import NoExpenseMessage from "./NoExpenseMessage";
import { groupExpenseByCategory } from "@/lib/utils";

type ExpenseCategoryGroupProps = {
  categoryData: GroupedExpenses;
};

const ExpenseCategoryGroup = ({ categoryData }: ExpenseCategoryGroupProps) => {
  const [tableOpen, setTableOpen] = useState<boolean>(false);
  const { month, category, expenses, budget } = categoryData;

  return (
    <div className="flex flex-col items-start gap-2 bg-card mx-4 rounded-xl p-4">
      <CategoryHeader category={category} budget={budget} />
      <div className="flex w-full gap-4 items-center">
        <ProgressBar expenses={expenses} budget={budget} />
        <button
          className="rounded-full bg-page text-accent text-xl h-8 w-8 font-extrabold"
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
