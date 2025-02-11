import { createClient } from "@/lib/supabase/server";
import { ApprovedTransactionItem } from "@/types/plaid";
import { getUser } from "../actions";
import { capitalizePlaidCategory } from "@/lib/utils";

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
  try {
    const supabase = createClient();
    if (!expenses.length) return;

    const { data, error } = await supabase
      .from("expenses")
      .upsert(
        expenses.map((expense) => {
          return {
            transaction_id: expense.transaction_id,
            user_id: user,
            account_id: expense.account_id,
            amount: expense.amount,
            authorized_date: expense.authorized_date,
            date: expense.date,
            merchant_name: expense.merchant_name,
            logo_url: expense.logo_url,
            personal_finance_category: capitalizePlaidCategory(
              expense.personal_finance_category
            ),
            personal_finance_category_icon_url:
              expense.personal_finance_category_icon_url,
            name: expense.name,
            description: expense.name || (expense.merchant_name as string),
            payment_channel: expense.payment_channel,
          };
        })
      )
      .select();

    if (error)
      throw Error(
        `There was an issue updating expenses with modified transactions. Error message: ${error.message}`
      );
    return data;
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
