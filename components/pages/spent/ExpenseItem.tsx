import { formatCurrency, capitalize } from "@/lib/utils";
import { Expense } from "@/types/types";
import React from "react";

type ExpenseItemProps = {
  expense: Expense;
};

const ExpenseItem = ({ expense }: ExpenseItemProps) => {
  const { date, amount, description } = expense;
  return (
    <section className="flex gap-4 py-2 justify-start px-4 border-t border-light/30">
      <p>{capitalize(date)}</p>
      <p>{formatCurrency(amount, true)}</p>
      <p>{description}</p>
    </section>
  );
};

export default ExpenseItem;
