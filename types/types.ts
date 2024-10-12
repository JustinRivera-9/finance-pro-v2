import { PostgrestError, PostgrestResponse } from "@supabase/supabase-js";

export type CategoryData = {
  id: number;
  category: string;
  amount: number;
  type: string;
  isFixed: boolean;
  date: string;
  user_id: string;
};

export type CategoryFormData = {
  amount: string;
  category: string;
  isFixed: boolean;
  type: string;
  date: string;
  id: string;
  user_id: string;
};

export type ToastActionResults = {
  success: boolean;
  message: string;
};

export type Expense = {
  id: string;
  user_id: string;
  category: string;
  amount: number;
  description: string | null;
  date: string;
};

export type ExpensesArray = {
  expenses: Expense[];
};

export type GetExpensesResponse = {
  expenses: Expense[] | null;
  error: PostgrestError | string | null;
};

// PLAID TYPES
export type ExchangePublicTokenProps = {
  publicToken: string;
  user: any;
};
