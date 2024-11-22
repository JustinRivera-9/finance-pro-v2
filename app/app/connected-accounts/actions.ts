"use server";
import { getUser } from "@/lib/supabase/actions";
import { createClient } from "@/lib/supabase/server";

type PlaidItemData = {
  accessToken: string;
  itemId: string;
  requestId: string;
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
