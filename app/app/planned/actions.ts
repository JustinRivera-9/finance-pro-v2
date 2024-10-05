"use server";
import { v4 as uuid } from "uuid";

import { getUser } from "@/lib/supabase/actions";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { CategoryFormData } from "@/types/types";
const supabase = createClient();

export const getCategories = async () => {
  const user_id = await getUser();

  let { data: categories, error } = await supabase
    .from("categories")
    .select("*")
    .eq("user_id", user_id);

  if (error) return error;
  return categories;
};

export const addCategoryAction = async (formData: FormData) => {
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
      .update({
        type: cleanData.type,
        category: cleanData.category,
        amount: cleanData.amount,
        date: cleanData.date,
        isFixed: cleanData.isFixed,
      })
      .eq("id", cleanData.id)
      .select();

    revalidatePath("app/planned");

    return { success: true, message: "Category successfully updated!" };
  } catch (error) {
    const err = error as Error;
    return { success: false, message: err.message };
  }
};
