import ConnectAccountBtn from "@/components/plaid/ConnectAccountBtn";
import { getUser } from "@/lib/supabase/actions";
import { createClient } from "@/lib/supabase/server";

const ConnectedAccountsPage = async () => {
  const supabase = createClient();
  const user_id = (await getUser()) as string;
  let { data, error } = await supabase
    .from("plaid")
    .select("*")
    .eq("user_id", user_id);

  console.log(data);

  return (
    <div className="flex flex-col items-center">
      <h1>Connect Your Bank Accounts</h1>
      <p className="text-error">Coming soon. One man army over here</p>
      <ConnectAccountBtn user={user_id} variant="primary" />
    </div>
  );
};

export default ConnectedAccountsPage;
