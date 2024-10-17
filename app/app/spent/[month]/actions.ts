"use server";

import { createClient } from "@/lib/supabase/server";
import { GetExpensesResponse } from "@/types/types";

export const getExpenses = async (): Promise<GetExpensesResponse> => {
  const supabase = createClient();
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

export const addExpenseAction = (formData: FormData) => {
  const supabase = createClient();

  const { category, amount, description, date } = Object.fromEntries(formData);
  console.log(category, amount, description, date);
};

export const editExpenseAction = (formData: FormData) => {
  const supabase = createClient();

  const { category, amount, description, date } = Object.fromEntries(formData);
  console.log(category, amount, description, date);
};
