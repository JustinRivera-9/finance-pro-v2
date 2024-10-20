import { Expense, GroupedExpenses, reduceArrParam } from "@/types/types";
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

export const filterExpenses = (month: string, expenses: Expense[]) => {
  const monthConversionObj: { [key: string]: string } = {
    "01": "january",
    "02": "february",
    "03": "march",
    "04": "april",
    "05": "may",
    "06": "june",
    "07": "july",
    "08": "august",
    "09": "september",
    "10": "october",
    "11": "november",
    "12": "december",
  };

  const filteredExpenses = expenses.filter(
    (expense) => monthConversionObj[expense.date.split("/")[0]] === month
  );

  if (!filteredExpenses.length) return null;

  return filteredExpenses;
};

export const groupExpenseByCategory = (month: string, expenses: Expense[]) => {
  const filteredExpenses = filterExpenses(month, expenses);

  if (!filteredExpenses) return null;

  const groupedExpenses = filteredExpenses.reduce<GroupedExpenses>(
    (acc, expense) => {
      const { category } = expense;
      if (!acc[category]) {
        acc[category] = {
          category,
          expenses: [],
        };
      }
      acc[category].expenses.push(expense);
      return acc;
    },
    {}
  );

  // Convert the grouped object back to an array
  const categorizedExpenses = Object.values(groupedExpenses);
  return categorizedExpenses;
};

export const capitalize = (str: string): string =>
  str.charAt(0).toUpperCase() + str.slice(1);

export const formatExpenseDate = (date: string) => {
  const [month, day, year] = date.split("/");

  const formattedYear = year.slice(-2);
  const formattedDate = [month, day, formattedYear].join("/");

  return formattedDate;
};

export const reduceArr = (arr: reduceArrParam[]): number => {
  if (!arr) return 0;
  return arr?.map((el) => Number(el.amount)).reduce((acc, cur) => acc + cur, 0);
};
