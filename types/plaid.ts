import { AccountBase, RemovedTransaction, Transaction } from "plaid";

export type TransactionData = {
  added: Transaction[];
  modified: Transaction[];
  removed: RemovedTransaction[];
  cursor: string;
  accounts: AccountBase[];
  user: string;
};

export type ApprovedTransactionItem = {
  account_id: string;
  amount: number;
  authorized_date: string | null;
  date: string;
  merchant_name: string | null | undefined;
  logo_url: string | null | undefined;
  personal_finance_category: string | undefined;
  personal_finance_category_icon_url: string | undefined;
  transaction_id: string;
  name: string;
  category: string;
  isApproved: boolean;
  description: string;
};

export type PlaidItemData = {
  item_id: string;
  created_at: string | Date;
  user_id: string;
  access_token: string;
  transaction_cursor: string;
  is_active: boolean;
};

export type AddItemParams = {
  access_token: string;
  item_id: string;
  user_id: string;
};

export type SyncTransactionsData = {
  added: Transaction[];
  modified: Transaction[];
  removed: RemovedTransaction[];
  cursor: string;
  accounts: AccountBase[];
};
