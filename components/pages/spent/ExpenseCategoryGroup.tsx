"use client";
import { Expense } from "@/types/types";
import CategoryHeader from "./CategoryHeader";
import ExpenseTable from "./ExpenseTable";
import { useState } from "react";
import ProgressBar from "./ProgressBar";
import { Button } from "@/components/ui/button";

type ExpenseCategoryGroupProps = {
  category: string;
  expenses: Expense[];
};

const ExpenseCategoryGroup = ({
  category,
  expenses,
}: ExpenseCategoryGroupProps) => {
  const [tableOpen, setTableOpen] = useState<boolean>(true);

  return (
    <div className="flex flex-col gap-2">
      <CategoryHeader category={category} />
      <div className="flex w-full justify-between px-4 gap-2">
        <ProgressBar expenses={expenses} />
        <button
          className="rounded-full bg-card text-accent w-8 h-8"
          onClick={() => setTableOpen((prev) => !prev)}
        >
          {tableOpen ? "-" : "+"}
        </button>
      </div>
      {tableOpen && <ExpenseTable expenses={expenses} />}
    </div>
  );
};

export default ExpenseCategoryGroup;
