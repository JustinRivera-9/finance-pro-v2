"use server";
import { createClient } from "@/lib/supabase/server";

const supabase = createClient();

export const getExpenses = async () => {
  let { data: expenses, error } = await supabase.from("expenses").select("*");

  return { expenses, error };
};
