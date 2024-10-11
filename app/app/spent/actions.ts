"use server";
import { createClient } from "@/lib/supabase/server";
import type { GetExpensesResponse } from "@/types/types";

const supabase = createClient();

export const getExpenses = async (): Promise<GetExpensesResponse> => {
  try {
    let { data: expenses, error } = await supabase.from("expenses").select("*");

    if (error) throw Error;

    return { expenses, error: null };
  } catch (err) {
    return {
      expenses: null,
      error: "There was an error getting expenses. Please try again",
    };
  }
};
