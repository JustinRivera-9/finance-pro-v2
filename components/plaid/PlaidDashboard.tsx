import { PlaidItemData } from "@/app/app/connected-accounts/actions";

type PlaidDashboardProps = {
  item: PlaidItemData;
  user: string;
};

const PlaidDashboard = ({ item, user }: PlaidDashboardProps) => {
  console.log("Item: ", item);
  console.log("User: ", user);
  return <div>Account Connected</div>;
};

export default PlaidDashboard;
