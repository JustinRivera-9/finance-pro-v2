import { type PlannedCategories } from "../types/types";

////////// calcTotalPlannedExpenses
export const calcTotalPlanned = (
  categories: PlannedCategories[],
  type: string
): number => {
  if (!Array.isArray(categories)) {
    throw new TypeError("categories is not an array");
  }

  const totalExpensesArr = categories
    .filter((category) => category.type === type)
    .map((category) => category.amount);

  if (!totalExpensesArr.length) return 0;
  const totalExpenses = totalExpensesArr.reduce((acc, cur) => acc + cur);

  return totalExpenses;
};

//////////
