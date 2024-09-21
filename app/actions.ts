"use server";

import { encodedRedirect } from "@/utils/utils";
import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const signUpAction = async (formData: FormData) => {};

export const signInAction = async (formData: FormData) => {};

export const forgotPasswordAction = async (formData: FormData) => {};

export const resetPasswordAction = async (formData: FormData) => {};

export const signOutAction = async () => {};
