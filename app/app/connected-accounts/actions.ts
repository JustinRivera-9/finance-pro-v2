"use server";
import { getUser } from "@/lib/supabase/actions";
import { createClient } from "@/lib/supabase/server";
import {
  AddItemParams,
  ApprovedTransactionItem,
  TransactionData,
} from "@/types/plaid";
import { AccountBase } from "plaid";

// Used to know if a bank has already been connected. If true -> renders dashboard / If false -> connect bank flow
export const getItems = async (user: string) => {
  const supabase = createClient();
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

// Updates 'accounts' table in database when /api/transactions-sync is called
export const updateAccounts = async (
  accountData: AccountBase[],
  item_id: string
) => {
  const supabase = createClient();

  try {
    const { error } = await supabase.from("accounts").upsert(
      accountData.map((account: AccountBase) => {
        const { account_id, name, balances, type, subtype } = account;
        return {
          account_id,
          name,
          balances,
          type,
          subtype,
          item_id,
        };
      })
    );

    if (error)
      throw Error(
        `Failed to update row in accounts table. Error message: ${error.message}`
      );
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

export const updateTransactions = async (plaidData: TransactionData) => {
  const supabase = createClient();
  const { accounts, added, modified, removed, cursor, user } = plaidData;

  // console.log("Added: ", added);
  // console.log("Accounts: ", accounts);
  // console.log("User: ", user);
  // console.log("Cursor: ", cursor);
  // console.log("Modified: ", modified);
  // console.log("Removed: ", removed);

  try {
    const { data, error } = await supabase
      .from("transactions")
      .update({
        accounts: JSON.stringify(accounts),
        added: JSON.stringify(added),
        modified: JSON.stringify(modified),
        removed: JSON.stringify(removed),
        cursor,
      })
      .eq("user_id", user)
      .select();

    // console.log("Existing transaction:", data, plaidData.user);

    if (error) throw Error("Problem updating item information");
  } catch (err) {
    const error = err as Error;
    console.log(error.message);
  }
};

export const handleConfirmTransactions = async (
  transactions: ApprovedTransactionItem[]
) => {
  const supabase = createClient();
  const user = await getUser();

  const { error } = await supabase.from("expenses").insert(
    transactions.map((transaction) => {
      return { ...transaction, user_id: user };
    })
  );

  if (error) console.log("Error adding bank transactions.");
};
