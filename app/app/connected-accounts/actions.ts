"use server";
import { getUser } from "@/lib/supabase/actions";
import {
  getExpenses,
  updateExpenses,
  updateExpensesWithConfirmedTransactions,
} from "@/lib/supabase/expenses/actions";
import { createClient } from "@/lib/supabase/server";
import {
  getTransactions,
  removeTransactionsAfterConfirming,
  updateTransactions,
} from "@/lib/supabase/transactions/actions";
import { capitalizePlaidCategory, formatPlaidDate } from "@/lib/utils";
import {
  AddItemParams,
  ApprovedTransactionItem,
  TransactionData,
} from "@/types/plaid";
import { revalidatePath } from "next/cache";
import { AccountBase } from "plaid";

// Used to know if a bank has already been connected. If true -> renders dashboard / If false -> connect bank flow
// export const getItems = async (user: string) => {
export const getItems = async () => {
  const supabase = createClient();
  const user = await getUser(); // added
  try {
    let { data: items, error } = await supabase
      .from("items")
      .select("*")
      .eq("user_id", user);

    if (error) throw Error("Error getting item from DB");

    if (!items?.length) return null;

    return items[0];
  } catch (err) {
    const error = err as Error;
    console.log(error.message);
  }
};

// Updates 'items' table with data
export const addItem = async (itemData: AddItemParams) => {
  const supabase = createClient();
  const { error } = await supabase
    .from("items")
    .insert([{ ...itemData, is_active: true }]);

  if (error) return error.message;
  return null;
};

export const getAccounts = async (user: string) => {
  const supabase = createClient();
  try {
    let { data: accounts, error } = await supabase
      .from("accounts")
      .select("*")
      .eq("user_id", user);

    if (error) throw Error("Error getting accounts from DB");

    return accounts;
  } catch (err) {
    const error = err as Error;
    console.log(error.message);
  }
};

// Updates 'accounts' table in database when /api/transactions-sync is called
export const updateAccounts = async (
  accountData: AccountBase[],
  item_id: string,
  user: string
) => {
  const supabase = createClient();

  try {
    const { data, error } = await supabase
      .from("accounts")
      .upsert(
        accountData.map((account: AccountBase) => {
          const { account_id, name, balances, type, subtype } = account;
          return {
            user_id: user,
            account_id,
            name,
            balances,
            type,
            subtype,
            item_id,
          };
        })
      )
      .select();

    if (error)
      throw Error(
        `Failed to update row in accounts table. Error message: ${error.message}`
      );

    return data;
  } catch (err) {
    const error = err as Error;
    console.log(error.message);
  }
};

// Updates 'item' table with next transaction cursor
export const updateTransactionCursor = async (
  transaction_cursor: string,
  item_id: string
) => {
  const supabase = createClient();

  try {
    const { data, error } = await supabase
      .from("items")
      .update({ transaction_cursor })
      .eq("item_id", item_id)
      .select();

    if (error)
      throw Error(
        `Failed to update transaction_cursor in 'items' table. Error message: ${error.message}`
      );
  } catch (err) {
    const error = err as Error;
    console.log(error.message);
  }
};

// Addes/Updates transactions to 'transactions' database table
export const syncTransactionsToDatabase = async (
  plaidData: TransactionData
) => {
  const { added, modified, removed, user } = plaidData;

  ////////// DATA FLOW
  // 1) On page load transaction data is fetched
  // 2) User selects transactions to be confirmed
  // 3) When confirmed, transactions get added to the expenses table
  // ?? What happens when a confirmed transaction is modified --> need to check expenses for modified transactions when syncing transactions
  // -- Will be expensive to fetch expenses and sort through them to see if there is a match and then to update expenses.

  ////////// 1) Use Promise.all() to fetch existing expenses and existing transactions
  const [expenses, existingTransactions] = await Promise.all([
    getExpenses(user),
    getTransactions(user),
  ]);

  ////////// 2) Compare removed transactions to existing transactions and expenses.
  const transactionsAfterRemoved = existingTransactions?.filter(
    (transaction) => {
      const isRemoved = removed?.some(
        (item) => item?.transaction_id === transaction.transaction_id
      );
      if (!isRemoved) {
        return true;
      } else {
        return;
      }
    }
  );

  ////////// 3) Compare existing expenses to modified transactions. Should contain an array of updated expenses
  const updatedExpensesArr: ApprovedTransactionItem[] | undefined = expenses
    ?.map((expense) => {
      const modifiedExpense = modified?.find(
        (modifiedTransaction) =>
          modifiedTransaction.transaction_id === expense.transaction_id
      );
      if (!modifiedExpense) return null;
      return {
        ...expense,
        account_id: modifiedExpense.account_id,
        amount: modifiedExpense.amount,
        authorized_date: formatPlaidDate(
          modifiedExpense.authorized_date as string
        ),
        date: formatPlaidDate(modifiedExpense.date),
        merchant_name: modifiedExpense.merchant_name,
        logo_url: modifiedExpense.logo_url,
        personal_finance_category: capitalizePlaidCategory(
          modifiedExpense.personal_finance_category?.primary
        ),
        personal_finance_category_icon_url:
          modifiedExpense.personal_finance_category_icon_url,
        transaction_id: modifiedExpense.transaction_id,
        name: modifiedExpense.name,
        description:
          modifiedExpense.name || (modifiedExpense.merchant_name as string),
        payment_channel: modifiedExpense.payment_channel,
      };
    })
    .filter(Boolean);
  // Remove any matching expenses from transactions

  ////////// 4) Compare modified transactions to existing transactions. Should contain an array of updated transactions
  const modifiedTransactions = transactionsAfterRemoved
    ?.map((transaction) => {
      const modifiedTransaction = modified?.find(
        (modifiedTransaction) =>
          modifiedTransaction.transaction_id === transaction.transaction_id
      );

      if (!modifiedTransaction) return null;
      return modifiedTransaction;
    })
    .filter(Boolean);

  ////////// 5) Replace any added transactions with the modified transactions if exists
  const updatedTransactionsArr = added?.map((transaction) => {
    const modifiedTransaction = modifiedTransactions?.find(
      (modifiedTransaction) =>
        modifiedTransaction?.transaction_id === transaction.transaction_id
    );

    if (!modifiedTransaction) return transaction;
    return modifiedTransaction;
  });

  ////////// 6) Use Promise.all() to updated expenses and transactions table
  ////////// 6a) Upsert data to database. This should update or insert transaction based on whether it is existing
  const [updatedExpenses, updatedTransactions] = await Promise.all([
    updateExpenses(updatedExpensesArr!, user),
    updateTransactions(updatedTransactionsArr, user),
  ]);

  return updatedTransactions;
  ////////// 7) Return updatedTranscations[] to be used on client
};

// Adds confirmed transactions from connected accounts to expenses
export const handleConfirmTransactions = async (
  transactions: ApprovedTransactionItem[]
) => {
  const user = await getUser();

  try {
    const [addedTransactions, removedTransactions] = await Promise.all([
      updateExpensesWithConfirmedTransactions(transactions, user!),
      removeTransactionsAfterConfirming(transactions),
    ]);

    revalidatePath("/app/connected-accounts");
  } catch (err) {
    const error = err as Error;
    console.log(error.message);
  }

  // remove from transactions
};
