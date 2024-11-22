import { PlaidItemData } from "@/app/app/connected-accounts/actions";

type PlaidDashboardProps = {
  item: PlaidItemData;
};

const PlaidDashboard = ({ item }: PlaidDashboardProps) => {
  console.log(item);
  return <div>Account Connected</div>;
};

export default PlaidDashboard;
