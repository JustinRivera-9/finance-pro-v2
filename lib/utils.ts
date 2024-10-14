import { Expense, GroupedExpenses } from "@/types/types";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const fixedDateArray = () => {
  const arr = [];
  for (let i = 1; i < 32; i++) {
    arr.push(i);
  }

  return arr;
};

export const parseStringify = (value: any) => JSON.parse(JSON.stringify(value));

export const formatCurrency = (value: number, rounded?: boolean) => {
  if (rounded) {
    const number = Math.round(+value);

    return new Intl.NumberFormat("en", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(number);
  } else {
    return new Intl.NumberFormat("en", {
      style: "currency",
      currency: "USD",
    }).format(value);
  }
};

export const groupExpenseByCategory = (expenses: Expense[]) => {
  const groupedExpenses = expenses.reduce<GroupedExpenses>((acc, expense) => {
    const { category } = expense;
    if (!acc[category]) {
      acc[category] = {
        category,
        expenses: [],
      };
    }
    acc[category].expenses.push(expense);
    return acc;
  }, {});

  // Convert the grouped object back to an array
  const categorizedExpenses = Object.values(groupedExpenses);
  return categorizedExpenses;
};

export const capitalize = (str: string): string =>
  str.charAt(0).toUpperCase() + str.slice(1);

export const formatExpenseDate = (date: string) => {
  const dateString = new Date(date);

  const month = dateString.getMonth() + 1;
  const day = dateString.getDate();
  const year = dateString.getFullYear().toString().slice(-2);

  return `${month}/${day}/${year}`;
};
