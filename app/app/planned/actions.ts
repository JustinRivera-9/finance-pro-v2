"use server";
import { v4 as uuid } from "uuid";

import { getUser } from "@/lib/supabase/actions";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { CategoryFormData } from "@/lib/types";
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
  // console.log(formFields);

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

  if (error) {
    console.log(error);
  }

  revalidatePath("app/planned");
};

export const updateCategory = async () => {};

export const deleteCategory = async () => {};
