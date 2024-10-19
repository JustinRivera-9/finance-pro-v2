import { formatCurrency, formatExpenseDate } from "@/lib/utils";
import { Expense } from "@/types/types";
import React from "react";
import ActionBtn from "./ActionBtn";

type ExpenseItemProps = {
  expense: Expense;
};

const ExpenseItem = ({ expense }: ExpenseItemProps) => {
  const { id, date, amount, description } = expense;
  return (
    <section className="grid grid-cols-[1fr_1fr_2fr_.15fr] gap-4 py-2 pl-2 border-t border-light/30">
      <p>{date}</p>
      <p>{formatCurrency(amount, true)}</p>
      <p>{description}</p>
      <ActionBtn expense={expense} />
    </section>
  );
};

export default ExpenseItem;
