import ConnectAccountBtn from "./ConnectAccountBtn";
import { getUser } from "@/lib/supabase/actions";

const ConnectAccountPage = async ({ user }: { user: string }) => {
  return (
    <div className="flex flex-col items-center gap-4 px-4 text-center">
      <h1 className="text-2xl text-accent">Connect Bank Accounts</h1>
      <h2 className="text-lg text-light/70">
        Connect a bank below to get started!
      </h2>
      <ConnectAccountBtn user={user} />
    </div>
  );
};

export default ConnectAccountPage;
