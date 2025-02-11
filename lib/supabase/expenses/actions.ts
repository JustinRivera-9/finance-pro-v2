import { createClient } from "@/lib/supabase/server";
import { ApprovedTransactionItem } from "@/types/plaid";
import { getUser } from "../actions";

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

// Updates existing expenses with modified transactions
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

// Updates 'expenses' table with approved bank transcations
export const updateExpensesWithConfirmedTransactions = async (
  transactions: ApprovedTransactionItem[],
  user: string
) => {
  const supabase = createClient();
  try {
    const { error } = await supabase.from("expenses").insert(
      transactions.map((transaction) => {
        return { ...transaction, user_id: user };
      })
    );

    if (error)
      throw Error(
        `Error adding bank transactions to 'expenses' table. Error message: ${error.message}`
      );
  } catch (err) {
    const error = err as Error;
    console.log(error.message);
  }

  // remove from transactions
};
