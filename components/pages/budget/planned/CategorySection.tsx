import { CategoryData } from "@/types/types";
import CategoryColumn from "./CategoryColumn";
import { sortFixedExpenses } from "@/lib/utils";

////////// Look into refactoring - DRY

type CategorySectionProps = { categories: CategoryData[] };

const CategorySection = ({ categories }: CategorySectionProps) => {
  const incomeCategory: CategoryData[] = categories.filter(
    (category: CategoryData) => category.type === "income"
  );

  const expenseCategory: CategoryData[] = categories.filter(
    (category: CategoryData) => category.type === "expense" && !category.isFixed
  );

  const fixedExpenseCategory: CategoryData[] = sortFixedExpenses(
    categories.filter(
      (category: CategoryData) =>
        category.type === "expense" && category.isFixed
    )
  );

  return (
    <div className="flex flex-col items-center text-center gap-6">
      <CategoryColumn category={incomeCategory} title="Income" />
      <CategoryColumn category={expenseCategory} title="Expenses" />
      <CategoryColumn category={fixedExpenseCategory} title="Fixed Expenses" />
    </div>
  );
};

export default CategorySection;
