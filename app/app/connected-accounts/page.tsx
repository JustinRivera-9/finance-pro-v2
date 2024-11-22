import { getUser } from "@/lib/supabase/actions";
import { getAccessToken, PlaidItemData } from "./actions";
import ConnectAccountPage from "@/components/plaid/ConnectAccountPage";
import PlaidDashboard from "@/components/plaid/PlaidDashboard";

const page = async () => {
  const user = (await getUser()) as string;
  const item: PlaidItemData = await getAccessToken();

  if (item.proUser) {
    return <PlaidDashboard item={item} />;
  } else {
    return <ConnectAccountPage user={user} />;
  }
};

export default page;
