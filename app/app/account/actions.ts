"use server";

import { getUser } from "@/lib/supabase/actions";
import { createClient } from "@/lib/supabase/server";
import type {
  ContactForm,
  PasswordForm,
  PreferencesForm,
  PersonalInfoForm,
} from "@/types/accountFormActions";
const supabase = createClient();

export const getAccountSettings = async () => {
  // Use promise method to do multiple fetches and wait until they all resolve
};

export const updatePersonalInfoAction = async ({ email }: PersonalInfoForm) => {
  const user_id = await getUser();

  const { data, error } = await supabase.auth.updateUser({
    email: email,
    data: { hello: "world" },
  });
};

export const updatePassword = async ({ password }: PasswordForm) => {
  const user_id = await getUser();

  const { data, error } = await supabase.auth.updateUser({
    password: password,
    data: { hello: "world" },
  });
};

export const updatePreferencesAction = async (formData: FormData) => {
  const user_id = getUser();
  const formFields = Object.fromEntries(formData);
  const data = {
    darkMode: Boolean(formFields.darkMode),
    emailNotifications: Boolean(formFields.emailNotifications),
  };
  console.log(data);
};

export const submitContactFormAction = async (formData: FormData) => {
  const user_id = await getUser();
  const formFields = Object.fromEntries(formData);
  const { type, message } = formFields;

  try {
    const { error } = await supabase
      .from("contact_us")
      .insert([{ type, message, user_id }]);

    if (error) throw error;

    return {
      success: true,
      message: "Thank you for the message. We will review as soon as possible!",
    };
  } catch (error) {
    const err = error as Error;
    return { success: false, message: err.message };
  }
};

export const logoutUser = async () => {
  let { error } = await supabase.auth.signOut();
};
