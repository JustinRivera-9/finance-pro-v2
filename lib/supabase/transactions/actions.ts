import { createClient } from "@/lib/supabase/server";
import { capitalizePlaidCategory } from "@/lib/utils";
import { Transaction } from "plaid";

export const getTransactions = async (user: string) => {
  const supabase = createClient();
  try {
    let { data: transactions, error } = await supabase
      .from("transactions")
      .select("*")
      .eq("user_id", user);

    if (error) throw Error("There was an issue getting transaction.");
    return transactions;
  } catch (err) {
    const error = err as Error;
    console.log(error.message);
  }
};

export const updateTransactions = async (
  transactions: Transaction[],
  user: string
) => {
  const supabase = createClient();
  try {
    if (!transactions) return;

    const { data, error } = await supabase
      .from("transactions")
      .upsert(
        transactions.map((transaction) => {
          return {
            transaction_id: transaction.transaction_id,
            user_id: user,
            account_id: transaction.account_id,
            amount: transaction.amount,
            authorized_date: transaction.authorized_date,
            date: transaction.date,
            merchant_name: transaction.merchant_name,
            logo_url: transaction.logo_url,
            personal_finance_category: capitalizePlaidCategory(
              transaction.personal_finance_category?.primary
            ),
            personal_finance_category_icon_url:
              transaction.personal_finance_category_icon_url,
            name: transaction.name,
            description:
              transaction.name || (transaction.merchant_name as string),
          };
        })
      )
      .select();

    if (error)
      throw Error(
        `There was an issue updating transactions. Error message: ${error.message}`
      );
    return data;
  } catch (err) {
    const error = err as Error;
    console.log(error.message);
  }
};
