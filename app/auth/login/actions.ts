"use server";

import { getUser } from "@/lib/supabase/actions";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function login(formData: FormData) {
  const supabase = createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    redirect("/auth/error");
  }

  revalidatePath("/app/dashboard", "layout");
  redirect("/app/dashboard");
}

export async function signup(userData: FormData) {
  const supabase = createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const formData = {
    email: userData.get("email") as string,
    password: userData.get("password") as string,
  };
  const name = userData.get("name") as string;

  const { error } = await supabase.auth.signUp(formData);

  if (error) {
    console.log(error);
    redirect("/error");
  }

  // Add new row in accounts table with name
  const user_id = await getUser();

  const { data } = await supabase.from("account").insert([{ name, user_id }]);

  revalidatePath("/app/dashboard", "layout");
  redirect("/app/dashboard");
}
