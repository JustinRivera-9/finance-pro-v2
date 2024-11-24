"use server";
import { getUser } from "@/lib/supabase/actions";
import { createClient } from "@/lib/supabase/server";
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

export const updateTransactions = async (data: TransactionData) => {
  const { added, modified, removed, cursor } = data;
};
