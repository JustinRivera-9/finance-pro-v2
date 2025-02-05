import { syncTransactions } from "@/lib/plaid/actions";
import AccountSection from "../pages/connectedAccounts/AccountSection";
import TransactionTable from "../pages/connectedAccounts/TransactionTable";
import { getCategories } from "@/app/app/budget/actions";
import { PlaidItemData, SyncTransactionsData } from "@/types/plaid";
import {
  updateAccounts,
  updateTransactionCursor,
} from "@/app/app/connected-accounts/actions";

type PlaidDashboardProps = { item: PlaidItemData; user: string };

const PlaidDashboard = async ({ item, user }: PlaidDashboardProps) => {
  const { access_token, item_id, transaction_cursor } = item;
  const transactionData: SyncTransactionsData = await syncTransactions(
    access_token,
    transaction_cursor,
    item_id,
    user
  );

  // Update data in database
  updateTransactionCursor(transactionData.cursor, item_id);
  updateAccounts(transactionData.accounts, item_id);

  const categories = await getCategories();

  return (
    <div className="flex flex-col gap-4 items-center text-center py-2 px-4">
      {/* <AccountSection accounts={transactionData.accounts} />
      <TransactionTable
        transactions={added}
        accounts={accounts}
        categories={categories as any[]}
      /> */}
    </div>
  );
};

export default PlaidDashboard;
