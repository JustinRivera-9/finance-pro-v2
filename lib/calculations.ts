import { type PlannedCategories } from "./types";

////////// calcTotalPlannedExpenses
export const calcTotalPlanned = (
  categories: PlannedCategories[],
  type: string
): number => {
  if (!Array.isArray(categories)) {
    throw new TypeError("categories is not an array");
  }

  const totalExpenses = categories
    .filter((category) => category.type === type)
    .map((category) => category.amount)
    .reduce((acc, cur) => acc + cur);

  return totalExpenses;
};

//////////
