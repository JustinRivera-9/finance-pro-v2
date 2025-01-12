import BudgetOverview from "../../dashboard/BudgetOverview";
import CategoryCarousel from "../../dashboard/CategoryCarousel";
import UpcomingExpenses from "../../dashboard/UpcomingExpenses";
import RecentExpenses from "../../dashboard/RecentExpenses";
import { getCategories, getExpenses } from "@/app/app/budget/actions";

const SpentTab = async () => {
  const [expenses, categories] = await Promise.all([
    getExpenses(),
    getCategories(),
  ]);

  if (expenses.error || !expenses.expenses || !categories) {
    return <p>There was an error getting budget data</p>;
  }

  return (
    <div className="flex flex-col gap-4">
      <BudgetOverview expenses={expenses.expenses} categories={categories} />
      <CategoryCarousel expenses={expenses.expenses} categories={categories} />
      <UpcomingExpenses />
      <RecentExpenses />
    </div>
  );
};

export default SpentTab;
