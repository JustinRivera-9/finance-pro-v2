"use server";

import { getUser } from "@/lib/supabase/actions";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export const updatePersonalInfoAction = async (formData: FormData) => {
  const supabase = createClient();
  const user_id = await getUser();

  const formFields = Object.fromEntries(formData);
  const { name, email } = formFields;

  const updateEmail = async () => {
    const { error: emailError } = await supabase.auth.updateUser({
      email: email as string,
    });

    return emailError;
  };

  const updateName = async () => {
    const { error: nameError } = await supabase
      .from("settings")
      .update({ name })
      .eq("user_id", user_id);

    return nameError;
  };

  await Promise.all([updateEmail(), updateName()]);

  revalidatePath("app/account");
};

export const updatePassword = async (formData: FormData) => {
  const supabase = createClient();
  const user_id = await getUser();

  const formFields = Object.fromEntries(formData);

  // const { data, error } = await supabase.auth.updateUser({
  //   password: password,
  //   data: { hello: "world" },
  // });
};

export const updatePreferencesAction = async (formData: FormData) => {
  const supabase = createClient();
  const user_id = getUser();

  const formFields = Object.fromEntries(formData);
  const data = {
    darkMode: Boolean(formFields.darkMode),
    emailNotifications: Boolean(formFields.emailNotifications),
  };
  console.log(data);
};

export const submitContactFormAction = async (formData: FormData) => {
  const supabase = createClient();
  const user_id = await getUser();

  const formFields = Object.fromEntries(formData);
  const { type, message } = formFields;

  try {
    const { error } = await supabase
      .from("contact_us")
      .insert([{ type, message, user_id }]);

    if (error) throw Error("Issue submitting form");

    return {
      success: true,
      message: "Thank you for the message. We will review as soon as possible!",
    };
  } catch (error) {
    const err = error as Error;
    console.log(err);
    return { success: false, message: err.message };
  }
};

export const logoutUser = async () => {
  const supabase = createClient();
  let { error } = await supabase.auth.signOut();
};
