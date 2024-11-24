import { PlaidItemData } from "@/app/app/connected-accounts/actions";
import { fetchTransactions } from "@/lib/plaid/actions";

type PlaidDashboardProps = {
  item: PlaidItemData;
};

const PlaidDashboard = async ({ item }: PlaidDashboardProps) => {
  const { accessToken } = item;
  const { accounts, added, modified, removed, cursor } =
    await fetchTransactions(accessToken, item.cursor);
  /*
  ADDED DATA
ACCOUNTS DATA
account_id - use this to match transactions to specific accounts
balances.available
balances.current
name
subtype

TRANSACTION DATA
account_id - use this to match transactions to specific accounts
amount
authorized_date
merchant_name
logo_url
personal_finance_category.primary
personal_finance_category_icon_url
transaction_id
*/
  console.log(accounts);

  return (
    <div>
      <h1>Added Transactions</h1>
      {/* {added.map((item) => (

      ))} */}
    </div>
  );
};

export default PlaidDashboard;
