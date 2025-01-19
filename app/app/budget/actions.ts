"use server";
import { getUser } from "@/lib/supabase/actions";
import { createClient } from "@/lib/supabase/server";
import { formatExpenseDate } from "@/lib/utils";
import { GetExpensesResponse } from "@/types/types";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { v4 as uuid } from "uuid";
import { CategoryFormData } from "@/types/types";

// EXPENSE ACTIONS
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

    revalidatePath("app/budget");
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

// CATEGORY ACTIONS

export const getCategories = async () => {
  const supabase = createClient();
  const user_id = await getUser();

  let { data: categories, error } = await supabase
    .from("categories")
    .select("*")
    .eq("user_id", user_id);

  return categories;
};

export const addCategoryAction = async (formData: FormData) => {
  const supabase = createClient();

  const user_id = await getUser();
  const formFields = Object.fromEntries(formData);

  const { isFixed, type } = formFields;
  let cleanData: CategoryFormData;

  if (type === "income" || !isFixed) {
    cleanData = {
      ...formFields,
      date: "",
      isFixed: false,
    } as CategoryFormData;
  } else {
    cleanData = {
      ...formFields,
      isFixed: true,
    } as CategoryFormData;
  }

  try {
    const { error } = await supabase
      .from("categories")
      .insert([
        {
          type: cleanData.type,
          category: cleanData.category,
          amount: cleanData.amount,
          date: cleanData.date,
          isFixed: cleanData.isFixed,
          id: uuid(),
          user_id,
        },
      ])
      .eq("user_id", user_id);

    if (error) throw error;

    revalidatePath("app/planned");
    return { success: true, message: "Category added successfully!" };
  } catch (error) {
    const err = error as Error;
    return { success: false, message: err.message };
  }
};

export const deleteCategoryAction = async (id: string) => {
  const supabase = createClient();

  try {
    const { error } = await supabase.from("categories").delete().eq("id", id);
    if (error) throw error;

    revalidatePath("app/planned");
    return { success: true, message: "Category added successfully!" };
  } catch (error) {
    const err = error as Error;
    return { success: false, message: err.message };
  }
};

export const updateCategoryAction = async (formData: FormData) => {
  const supabase = createClient();
  const user_id = await getUser();

  const formFields = Object.fromEntries(formData);

  const { isFixed, type, oldCategory } = formFields;
  let cleanData: CategoryFormData;

  if (type === "income" || !isFixed) {
    cleanData = {
      ...formFields,
      date: "",
      isFixed: false,
    } as CategoryFormData;
  } else {
    cleanData = {
      ...formFields,
      isFixed: true,
    } as CategoryFormData;
  }

  try {
    const { error: updateCategoryError } = await supabase
      .from("categories")
      .update({
        type: cleanData.type,
        category: cleanData.category,
        amount: cleanData.amount,
        date: cleanData.date,
        isFixed: cleanData.isFixed,
      })
      .eq("id", cleanData.id);

    revalidatePath("app/planned");

    // Updates all expenses that match the category being updated.
    const { error: updateExpensesError } = await supabase
      .from("expenses")
      .update({ category: cleanData.category })
      .eq("category", oldCategory)
      .eq("user_id", user_id);

    if (updateCategoryError) throw Error("Error updating category");
    if (updateExpensesError) throw Error("Error updating expense category");

    return { success: true, message: "Category successfully updated!" };
  } catch (error) {
    const err = error as Error;
    console.error(err.message);

    return { success: false, message: err.message };
  }
};
