"use server";

import { createClient } from "@/lib/supabase/server";

export const updatePersonalInfo = async ({ email }: { email: string }) => {
  const supabase = createClient();

  const { data, error } = await supabase.auth.updateUser({
    email: email,
    data: { hello: "world" },
  });
};

export const updatePassword = async ({ password }: { password: string }) => {
  const supabase = createClient();

  const { data, error } = await supabase.auth.updateUser({
    password: password,
    data: { hello: "world" },
  });
};

export const logoutUser = async () => {
  const supabase = createClient();
  let { error } = await supabase.auth.signOut();
};
