import ConnectAccountBtn from "./ConnectAccountBtn";
import { getUser } from "@/lib/supabase/actions";

const ConnectAccountPage = async ({ user }: { user: string }) => {
  return (
    <div className="flex flex-col items-center">
      <h1>Connect Your Bank Accounts</h1>
      <p className="text-error">Coming soon. One man army over here</p>
      <ConnectAccountBtn user={user} variant="primary" />
    </div>
  );
};

export default ConnectAccountPage;
