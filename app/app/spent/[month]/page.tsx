import ExpenseSection from "@/components/pages/spent/ExpenseSection";
import Summary from "@/components/pages/spent/Summary";
import { createClient } from "@/lib/supabase/server";
import { GetExpensesResponse } from "@/types/types";
import { getCategories } from "../../planned/actions";
import { getExpenses } from "./actions";

const ExpensesPage = async ({ params }: { params: { month: string } }) => {
  const [expensesData, categories] = await Promise.all([
    getExpenses(),
    getCategories(),
  ]);

  const { expenses, error: expenseError } = expensesData;
  console.log(categories);

  if (expenseError)
    return <div>There was an error getting expenses. Please try again</div>;

  return (
    expenses && (
      <>
        <Summary expenses={expenses} categories={categories} />
        <ExpenseSection expenses={expenses} month={params.month} />
      </>
    )
  );
};

export default ExpensesPage;