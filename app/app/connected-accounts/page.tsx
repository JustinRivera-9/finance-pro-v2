import { getAccessToken, PlaidItemData } from "./actions";
import ConnectAccountPage from "@/components/plaid/ConnectAccountPage";
import PlaidDashboard from "@/components/plaid/PlaidDashboard";

const page = async () => {
  const item: PlaidItemData = await getAccessToken();

  if (item.proUser) {
    return <PlaidDashboard item={item} />;
  } else {
    return <ConnectAccountPage />;
  }
};

export default page;
