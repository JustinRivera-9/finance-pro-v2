import { ChartData } from "@/components/pages/budget/spent/CategoryCarousel";
import { CategoryData, Expense, reduceArrParam } from "@/types/types";
import { type ClassValue, clsx } from "clsx";
import { format, parseISO } from "date-fns";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// export const parse = (value: any) => JSON.parse(value);
// export const stringify = (value: any) => JSON.stringify(value);

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

////////// MISC FUNCTIONS //////////
export const daysToFixedExpense = (
  currentDay: number | string,
  expenseDate: number | string
): number => {
  return Number(expenseDate) - Number(currentDay);
};

// Used for category carousel
export const calcAngle = (planned: number, spent: number): number =>
  (spent / planned) * 360;

// Used for budget overview chart
export const budgetOverviewFilter = (
  expenses: Expense[],
  categories: CategoryData[],
  formattedFilter: string
) => {
  const arr = categories.reduce<any[]>((result, categoryItem) => {
    if (
      (categoryItem.type === "expense" && categoryItem.isFixed) ||
      categoryItem.type === "income"
    ) {
      return result;
    }

    const { category, amount: plannedAmount, id } = categoryItem;

    // Checks if the expense date matches the filter
    const categoryExpensesArr = expenses.filter((expense) => {
      const [month, , year] = expense.date.split("/");
      const matchesFilter = `${month}/${year}` === formattedFilter;
      return expense.category === category && matchesFilter;
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

////////// STRING FORMATTING FUNCTIONS //////////
export const capitalize = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
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

////////// DATE FORMATTING FUNCTIONS //////////
// Takes in 'jan' and '2024' ==> 01/24. Mainly used for custom useParamsFilter hook
export const formatMonthAndYear = (monthValue: string, yearValue: string) => {
  const year = yearValue.slice(-2);
  for (const [key, value] of Object.entries(monthArr)) {
    if (value === monthValue.toLowerCase()) {
      return `${key}/${year}`;
    }
  }

  throw new Error(`Invalid month value: ${monthValue}`);
};

// '01/15/2024' ==> 01/15/24
export const formatExpenseDate = (date: string) => {
  const [month, day, year] = date.split("/");

  const formattedYear = year.slice(-2);
  const formattedDate = [month, day, formattedYear].join("/");

  return formattedDate;
};

// '01/15/2024' ==> '01/24'
export const formatExpenseDateForFilter = (expenseDate: string) => {
  const [month, day, year] = expenseDate.split("/");
  return `${month}/${year}`;
};

export const formatPlaidDate = (dateString: string) => {
  if (!dateString) {
    console.error("Issue formatting expense date");
    return dateString;
  }

  const parsedDate = parseISO(dateString);
  return format(parsedDate, "MM/dd/yy");
};

////////// CURRENCY FORMATTING FUNCTIONS //////////
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

export const fixedDateArray = () => {
  const arr = [];
  for (let i = 1; i < 32; i++) {
    arr.push(i);
  }

  return arr;
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

export const reduceArr = (arr: reduceArrParam[] | undefined): number => {
  if (!arr) return 0;
  return arr?.map((el) => Number(el.amount)).reduce((acc, cur) => acc + cur, 0);
};

////////// SORTING FUNCTIONS //////////
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

////////// FILTER FUNCTIONS //////////
// Filters expenses based on search params for month and year
export const filterExpensesByMonthYear = (
  expenses: Expense[],
  filterDate: string
) => {
  return expenses.filter(
    (expense) => formatExpenseDateForFilter(expense.date) === filterDate
  );
};

// Groups expenses by category
export const groupExpenseByCategory = (
  expenses: Expense[],
  categories: CategoryData[]
) => {
  // Creates an array of objects containing info for each expense category
  const groupedCategories = categories.map((category) => {
    const categoryWithExpense = expenses?.filter(
      (expense) => expense.category === category.category
    );

    return {
      category: category.category,
      expenses: categoryWithExpense,
      budget: category.amount,
      id: category.id,
    };
  });

  return groupedCategories;
};
