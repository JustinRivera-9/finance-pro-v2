import { getItems } from "./actions";
import ConnectAccountPage from "@/components/plaid/ConnectAccountPage";
import PlaidDashboard from "@/components/plaid/PlaidDashboard";
import { getUser } from "@/lib/supabase/actions";
import { PlaidItemData } from "@/types/plaid";

const page = async () => {
  const user = await getUser();
  const item: PlaidItemData = await getItems(user || "");

  if (item?.item_id) {
    return <PlaidDashboard user={user || ""} item={item} />;
  } else {
    return <ConnectAccountPage user={user || ""} />;
  }
};

export default page;
