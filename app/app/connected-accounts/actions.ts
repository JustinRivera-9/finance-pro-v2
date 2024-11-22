"use server";
import { getUser } from "@/lib/supabase/actions";
import { createClient } from "@/lib/supabase/server";

export type PlaidItemData = {
  accessToken: string;
  itemId: string;
  requestId: string;
  proUser: boolean;
};

export const addAccessToken = async (data: PlaidItemData) => {
  const supabase = createClient();
  const user = await getUser();

  const { error } = await supabase
    .from("plaid")
    .update({ ...data })
    .eq("user_id", user);

  if (error) return error.message;
};

export const getAccessToken = async () => {
  const supabase = createClient();
  const user = await getUser();

  let { data: plaid, error } = await supabase
    .from("plaid")
    .select("*")
    .eq("user_id", user);

  if (error || !plaid?.length) return error;
  return plaid[0];
};
