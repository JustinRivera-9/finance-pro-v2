import { PlannedCategories } from "@/lib/types";
import CategoryColumn from "./CategoryColumn";

////////// Look into refactoring - DRY

type CategorySectionProps = { categories: PlannedCategories[] };

const CategorySection: React.FC<CategorySectionProps> = ({ categories }) => {
  const incomeCategory: PlannedCategories[] = categories.filter(
    (category: PlannedCategories) => category.type === "income"
  );

  const expenseCategory: PlannedCategories[] = categories.filter(
    (category: PlannedCategories) =>
      category.type === "expense" && !category.isFixed
  );

  // ADD SORT BY DATE TO SHOW EXPENSES IN ORDER
  const fixedExpenseCategory: PlannedCategories[] = categories.filter(
    (category: PlannedCategories) =>
      category.type === "expense" && category.isFixed
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
