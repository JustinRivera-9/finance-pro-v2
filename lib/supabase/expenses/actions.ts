import { createClient } from "@/lib/supabase/server";
import { ApprovedTransactionItem } from "@/types/plaid";

export const getExpenses = async (user: string) => {
  const supabase = createClient();
  try {
    let { data: expenses, error } = await supabase
      .from("expenses")
      .select("*")
      .eq("user_id", user);

    if (error)
      throw Error("There was an error getting expenses. Please try again");

    return expenses;
  } catch (err) {
    const error = err as Error;
    console.log(error.message);
  }
};

export const updateExpenses = async (
  expenses: ApprovedTransactionItem[],
  user: string
) => {
  const supabase = createClient();
  //   console.log(expenses);
  //   console.log(user);
  try {
    if (!expenses.length) return;
  } catch (err) {
    const error = err as Error;
    console.log(error.message);
  }
};
