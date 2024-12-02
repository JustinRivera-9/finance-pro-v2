import { AccountBase, RemovedTransaction, Transaction } from "plaid";

export type PlaidItemData = {
  accessToken: string;
  itemId: string;
  requestId: string;
  proUser: boolean;
};

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
  userCategory: string;
};
