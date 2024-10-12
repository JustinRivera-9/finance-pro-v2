import ExpenseSection from "@/components/pages/spent/ExpenseSection";
import Summary from "@/components/pages/spent/Summary";
import { createClient } from "@/lib/supabase/server";
import { GetExpensesResponse } from "@/types/types";

const ExpensesPage = async ({ params }: { params: { month: string } }) => {
  const getExpenses = async (): Promise<GetExpensesResponse> => {
    const supabase = createClient();
    try {
      let { data: expenses, error } = await supabase
        .from("expenses")
        .select("*");

      if (error) throw Error;

      return { expenses, error: null };
    } catch (err) {
      return {
        expenses: null,
        error: "There was an error getting expenses. Please try again",
      };
    }
  };

  const { expenses, error } = await getExpenses();

  if (error)
    return <div>There was an error getting expenses. Please try again</div>;

  return (
    expenses && (
      <>
        <Summary />
        <ExpenseSection expenses={expenses} month={params.month} />
      </>
    )
  );
};

export default ExpensesPage;
