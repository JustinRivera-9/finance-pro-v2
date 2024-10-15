import ExpenseSection from "@/components/pages/spent/ExpenseSection";
import Summary from "@/components/pages/spent/Summary";
import { CategoryData } from "@/types/types";
import { getCategories } from "../../planned/actions";
import { getExpenses } from "./actions";
import MonthFilter from "@/components/pages/spent/MonthFilter";

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
      <>
        <MonthFilter month={params.month} />
        <Summary
          expenses={expenses}
          categories={categories as CategoryData[]}
        />
        <ExpenseSection expenses={expenses} month={params.month} />
      </>
    )
  );
};

export default ExpensesPage;
