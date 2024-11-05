import BudgetOverview from "@/components/pages/dashboard/BudgetOverview";
import CategoryCarousel from "@/components/pages/dashboard/CategoryCarousel";
import RecentExpenses from "@/components/pages/dashboard/RecentExpenses";
import UpcomingExpenses from "@/components/pages/dashboard/UpcomingExpenses";

const DashboardPage = () => {
  return (
    <div className="flex flex-col gap-2">
      <BudgetOverview />
      <CategoryCarousel />
      <UpcomingExpenses />
      <RecentExpenses />
    </div>
  );
};

export default DashboardPage;
