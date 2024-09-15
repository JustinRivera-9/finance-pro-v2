export type PlannedCategories = {
  id: number;
  category: string;
  amount: number;
  type: string;
  isFixed?: boolean;
  date?: string;
};

export type CategoryFormData = {
  amount: string;
  category: string;
  isFixed: boolean;
  type: string;
  fixedDate: string;
};
