import { syncTransactions } from "@/lib/plaid/actions";
import AccountSection from "../pages/connectedAccounts/AccountSection";
import TransactionTable from "../pages/connectedAccounts/TransactionTable";
import { getCategories } from "@/app/app/budget/actions";
import { ApprovedTransactionItem, PlaidItemData } from "@/types/plaid";
import {
  getAccounts,
  updateAccounts,
  updateTransactionCursor,
} from "@/app/app/connected-accounts/actions";
import { getTransactions } from "@/lib/supabase/transactions/actions";
import { AccountBase } from "plaid";

type PlaidDashboardProps = { item: PlaidItemData; user: string };

const PlaidDashboard = async ({ item, user }: PlaidDashboardProps) => {
  const { access_token, item_id, transaction_cursor } = item;
  const { cursor } = await syncTransactions(
    access_token,
    transaction_cursor,
    item_id,
    user
  );

  updateTransactionCursor(cursor, item_id);

  const [transactions, categories, accounts] = await Promise.all([
    getTransactions(user),
    getCategories(),
    getAccounts(user),
  ]);

  return (
    <div className="h-screen w-full px-4 gap-4 flex flex-col bg-page text-light">
      <AccountSection accounts={accounts as AccountBase[]} />
      <TransactionTable
        transactions={transactions as ApprovedTransactionItem[]}
        accounts={accounts as AccountBase[]}
        categories={categories as any[]}
      />
    </div>
  );
};

export default PlaidDashboard;
