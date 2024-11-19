import PlaidLink from "@/components/plaid/PlaidLink";
import { getUser } from "@/lib/supabase/actions";
import { createClient } from "@/lib/supabase/server";

const ConnectedAccountsPage = async () => {
  const supabase = createClient();
  const user_id = (await getUser()) as string;
  let { data: name, error: nameError } = await supabase
    .from("account")
    .select("name")
    .eq("user_id", user_id);

  if (!user_id || !name) {
    <p>Error getting user information</p>;
  }

  return (
    <div className="flex flex-col items-center">
      <h1>Connect Your Bank Accounts</h1>
      <p className="text-error">Coming soon. One man army over here</p>
      <PlaidLink user={user_id} variant="primary" />
    </div>
  );
};

export default ConnectedAccountsPage;
