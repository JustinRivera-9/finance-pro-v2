import { createClient } from "./client";

export const logoutUser = async () => {
  const supabase = createClient();
  let { error } = await supabase.auth.signOut();
};
