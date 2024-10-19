"use server";

import { getUser } from "@/lib/supabase/actions";
import { createClient } from "@/lib/supabase/server";
import { formatExpenseDate } from "@/lib/utils";
import { GetExpensesResponse } from "@/types/types";
import { revalidatePath } from "next/cache";
import { v4 as uuid } from "uuid";

export const getExpenses = async (): Promise<GetExpensesResponse> => {
  const supabase = createClient();
  const user_id = await getUser();

  try {
    let { data: expenses, error } = await supabase
      .from("expenses")
      .select("*")
      .eq("user_id", user_id);

    if (error) throw Error;

    return { expenses, error: null };
  } catch (err) {
    return {
      expenses: null,
      error: "There was an error getting expenses. Please try again",
    };
  }
};

export const addExpenseAction = async (formData: FormData) => {
  const supabase = createClient();
  const user_id = await getUser();
  const { date } = Object.fromEntries(formData);

  const cleanData = {
    ...Object.fromEntries(formData),
    date: formatExpenseDate(date as string),
    user_id,
    id: uuid(),
  };

  try {
    const { error } = await supabase.from("expenses").insert({ ...cleanData });

    if (error) throw Error;

    revalidatePath("app/spent");
  } catch (error) {
    console.error(error);
  }
};

export const editExpenseAction = (formData: FormData) => {
  const supabase = createClient();

  const { category, amount, description, date } = Object.fromEntries(formData);
  console.log(category, amount, description, date);
};
