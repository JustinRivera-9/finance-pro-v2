import { CategoryData } from "@/types/types";
import CategoryColumn from "./CategoryColumn";
import { sortFixedExpenses } from "@/lib/utils";

////////// Look into refactoring - DRY

type CategorySectionProps = { categories: CategoryData[] };

const CategorySection: React.FC<CategorySectionProps> = ({ categories }) => {
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
      <CategoryColumn category={expenseCategory} title="Expenses" />
      <CategoryColumn category={incomeCategory} title="Income" />
      <CategoryColumn category={fixedExpenseCategory} title="Fixed Expenses" />
    </div>
  );
};

export default CategorySection;
