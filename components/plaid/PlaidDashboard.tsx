import { PlaidItemData } from "@/app/app/connected-accounts/actions";
import { fetchTransactions } from "@/lib/plaid/actions";
import { getUser } from "@/lib/supabase/actions";
import AccountSection from "../pages/connectedAccounts/AccountSection";
import TransactionTable from "../pages/connectedAccounts/TransactionTable";
import { getCategories } from "@/app/app/budget/actions";

type PlaidDashboardProps = {
  item: PlaidItemData;
};

const PlaidDashboard = async ({ item }: PlaidDashboardProps) => {
  const user = (await getUser()) as string;
  const { accessToken, itemId } = item;
  const { accounts, added, modified, removed, cursor } =
    await fetchTransactions(accessToken, item.cursor, itemId, user);

  const categories = await getCategories();

  return (
    <div className="flex flex-col gap-4 items-center text-center py-2 px-4">
      <AccountSection accounts={accounts} />
      <TransactionTable
        transactions={added}
        accounts={accounts}
        categories={categories as any[]}
      />
    </div>
  );
};

export default PlaidDashboard;
