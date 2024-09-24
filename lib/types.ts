export type PlannedCategories = {
  id: number;
  category: string;
  amount: number;
  type: string;
  isFixed?: boolean;
  date?: string;
  user_id: string;
};

export type CategoryFormData = {
  amount: string;
  category: string;
  isFixed: boolean;
  type: string;
  fixedDate: string;
};

// PLAID TYPES
export type ExchangePublicTokenProps = {
  publicToken: string;
  user: any;
};
