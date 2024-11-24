"use server";
import { getUser } from "@/lib/supabase/actions";
import { createClient } from "@/lib/supabase/server";
import { stringify } from "@/lib/utils";
import { TransactionData } from "@/types/plaid";

export type PlaidItemData = {
  accessToken: string;
  itemId: string;
  requestId: string;
  proUser: boolean;
  cursor: string;
  transactions: any[];
};

export const addAccessToken = async (data: any) => {
  const supabase = createClient();
  const user = await getUser();

  const { error } = await supabase
    .from("transactions")
    .update({ ...data })
    .eq("user_id", user);

  if (error) return error.message;
};

export const getAccessToken = async () => {
  const supabase = createClient();
  const user = await getUser();

  let { data: transactions, error } = await supabase
    .from("transactions")
    .select("*")
    .eq("user_id", user);

  if (error || !transactions?.length) return error;
  return transactions[0];
};

export const updateTransactions = async (plaidData: TransactionData) => {
  const supabase = createClient();
  const { accounts, added, modified, removed, cursor, user } = plaidData;

  // Try turning data into json. Could be because it's not matching table column type?

  const { error } = await supabase
    .from("transactions")
    .update({
      accounts: accounts ? JSON.stringify(accounts) : null,
      added: added ? JSON.stringify(added) : null,
      modified: modified ? JSON.stringify(modified) : null,
      removed: removed ? JSON.stringify(removed) : null,
      cursor,
    })
    .eq("user_id", user);

  if (error) console.log("Error updating transactions table", error);
};
