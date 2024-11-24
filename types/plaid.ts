import { RemovedTransaction, Transaction } from "plaid";

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
};