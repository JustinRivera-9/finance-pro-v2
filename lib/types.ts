import { UUID } from "crypto";

export type PlannedCategories = {
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

// PLAID TYPES
export type ExchangePublicTokenProps = {
  publicToken: string;
  user: any;
};
