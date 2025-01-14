"use server";
import { getUser } from "@/lib/supabase/actions";
import { createClient } from "@/lib/supabase/server";
import { formatExpenseDate } from "@/lib/utils";
import { GetExpensesResponse } from "@/types/types";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
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

export const editExpenseAction = async (formData: FormData) => {
  const supabase = createClient();
  const { url, amount, description, date, id } = Object.fromEntries(formData);

  console.log(url);

  try {
    const { error } = await supabase
      .from("expenses")
      .update({ amount, description, date: formatExpenseDate(date as string) })
      .eq("id", id);

    if (error) throw Error;

    revalidatePath(url as string);
  } catch (error) {
    console.error("Error in editExpenseAction");
  }
  redirect(url as string);
};

export const deleteExpenseAction = async (id: string) => {
  const supabase = createClient();

  try {
    const { error } = await supabase.from("expenses").delete().eq("id", id);
    if (error) throw Error;

    revalidatePath("app/spent");
  } catch (error) {
    console.error(error);
  }
};

export const getEditExpense = async (id: string) => {
  const supabase = createClient();

  try {
    let { data: expenseData, error } = await supabase
      .from("expenses")
      .select("*")
      .eq("id", id);

    if (error) throw Error;

    return expenseData;
  } catch (err) {
    console.error(err);
  }
};
