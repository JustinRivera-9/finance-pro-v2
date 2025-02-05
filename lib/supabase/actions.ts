"use server";

import { createClient } from "./server";

export const getUser = async () => {
  const supabase = createClient();

  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user?.id) throw Error("There was a problem getting user ID");

    return user.id;
  } catch (err) {
    const error = err as Error;
    console.log(error.message);
  }
};
