import {
  ChartData,
  PieChartCategory,
} from "@/components/pages/dashboard/CategoryCarousel";
import { CategoryData, Expense, reduceArrParam } from "@/types/types";
import { type ClassValue, clsx } from "clsx";
import { format, parseISO } from "date-fns";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const monthArr = {
  "01": "jan",
  "02": "feb",
  "03": "mar",
  "04": "apr",
  "05": "may",
  "06": "jun",
  "07": "jul",
  "08": "aug",
  "09": "sep",
  "10": "oct",
  "11": "nov",
  "12": "dec",
};

export const getMonthAndYear = (monthValue: string, yearValue: string) => {
  const year = yearValue.slice(-2);
  for (const [key, value] of Object.entries(monthArr)) {
    if (value === monthValue.toLowerCase()) {
      return `${key}/${year}`;
    }
  }

  throw new Error(`Invalid month value: ${monthValue}`);
};

export const fixedDateArray = () => {
  const arr = [];
  for (let i = 1; i < 32; i++) {
    arr.push(i);
  }

  return arr;
};

export const parse = (value: any) => JSON.parse(value);
export const stringify = (value: any) => JSON.stringify(value);

export const formatCurrency = (
  value: number | null,
  rounded: boolean = true
) => {
  if (!value) return;

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

export const groupExpenseByCategory = (
  // month: string,
  expenses: Expense[],
  categories: CategoryData[]
) => {
  // Returns expenses based on current month
  // const filteredExpenses = filterExpenses(month, expenses);

  // Creates an array of objects containing info for each expense category
  const groupedCategories = categories.map((category) => {
    const categoryWithExpense = expenses?.filter(
      (expense) => expense.category === category.category
    );

    return {
      // month,
      category: category.category,
      expenses: categoryWithExpense,
      budget: category.amount,
    };
  });

  return groupedCategories;
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

export const sortFixedExpenses = (arr: CategoryData[]): CategoryData[] => {
  return arr.sort((a, b) => +a.date - +b.date);
};

export const sortBudgetOverview = (
  arr: { fill: string; category: string; amount: number }[]
) => {
  return arr.sort((a, b) => +a.amount - +b.amount);
};

export const sortCategoryOverview = (arr: ChartData[]) => {
  return arr.sort((a, b) => +b.angle - +a.angle);
};

export const sortExpenses = (
  arr: Expense[] | null | undefined
): Expense[] | null => {
  if (!arr) return null;

  return arr?.sort((a, b) => +b.date.split("/")[1] - +a.date.split("/")[1]);
};

export const daysToFixedExpense = (
  currentDay: number | string,
  expenseDate: number | string
): number => Number(expenseDate) - Number(currentDay);

export const calcAngle = (planned: number, spent: number): number =>
  (spent / planned) * 360;

export const getCurrentMonthAndYear = () => {
  const date = format(new Date(), "P");
  const [month, day, year] = date.split("/");
  const formattedYear = year.slice(2);
  const formattedDate = [month, formattedYear].join("/");
  return formattedDate;
};

export const filterExpensesByMonthAndYear = (
  expenses: Expense[],
  categories: CategoryData[],
  selectedMonth: string,
  selectedYear: string
): PieChartCategory[] => {
  const arr = categories.reduce<PieChartCategory[]>((result, categoryItem) => {
    if (
      (categoryItem.type === "expense" && categoryItem.isFixed) ||
      categoryItem.type === "income"
    ) {
      return result;
    }

    const { category, amount: plannedAmount, id } = categoryItem;
    const categoryExpensesArr = expenses.filter((expense) => {
      const [month, , year] = expense.date.split("/");
      const currentMonthYear = getMonthAndYear(selectedMonth, selectedYear);
      const isCurrentMonth = `${month}/${year}` === currentMonthYear;

      return expense.category === category && isCurrentMonth;
    });

    result.push({
      category,
      plannedAmount,
      spentAmount: reduceArr(categoryExpensesArr),
      id,
    });

    return result;
  }, []);

  return arr;
};

export const capitalizePlaidCategory = (
  input: string | undefined
): string | undefined => {
  const alwaysLowercase = ["and", "of", "the", "in", "on", "at", "by", "with"];
  if (!input) return input;
  return input
    .toLowerCase()
    .split("_")
    .map((word, index) => {
      if (alwaysLowercase.includes(word) && index !== 0) {
        return word;
      }
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
};

export const formatPlaidDate = (dateString: string) => {
  if (!dateString) {
    console.error("Issue formatting expense date");
    return dateString;
  }

  const parsedDate = parseISO(dateString);
  return format(parsedDate, "MM/dd/yy");
};
