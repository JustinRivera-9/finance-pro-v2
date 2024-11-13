import ExpenseSection from "@/components/pages/spent/ExpenseSection";
import Summary from "@/components/pages/spent/Summary";
import { CategoryData } from "@/types/types";
import { getCategories } from "../../planned/actions";
import { getExpenses } from "./actions";
import MonthFilter from "@/components/pages/spent/MonthFilter";
import CategoryCarousel from "@/components/pages/dashboard/CategoryCarousel";

const ExpensesPage = async ({ params }: { params: { month: string } }) => {
  const [expensesData, categories] = await Promise.all([
    getExpenses(),
    getCategories(),
  ]);

  const { expenses, error: expenseError } = expensesData;

  if (expenseError)
    return <div>There was an error getting expenses. Please try again</div>;

  return (
    expenses && (
      <section className="flex flex-col gap-6">
        <MonthFilter month={params.month} />
        <Summary
          month={params.month}
          expenses={expenses}
          categories={categories as CategoryData[]}
        />
        <CategoryCarousel />
        <ExpenseSection
          expenses={expenses}
          month={params.month}
          categories={categories as CategoryData[]}
        />
      </section>
    )
  );
};

export default ExpensesPage;
