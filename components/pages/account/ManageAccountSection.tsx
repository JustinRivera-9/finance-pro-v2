import FormDrawer from "@/components/ui/FormDrawer";
import React from "react";
import AccountOption from "./AccountOption";
import ManageAccountItem from "./ManageAccountItem";
import { getAccounts, getItems } from "@/app/app/connected-accounts/actions";
import { getUser } from "@/lib/supabase/actions";
import ManageAccountButton from "./ManageAccountButton";
import { Button } from "@/components/ui/button";
import ConnectAccountBtn from "@/components/plaid/ConnectAccountBtn";

const ManageAccountSection = async () => {
  // Fetch array of items and access tokens for each item
  const user = await getUser();
  const [items, accounts] = await Promise.all([
    getItems(user!),
    getAccounts(user!),
  ]);

  if (items?.access_token || !accounts?.length) {
    return (
      <FormDrawer
        title="Manage Connected Accounts"
        description="Add or remove connected accounts."
        triggerLabel={<AccountOption>Manage Connected Accounts</AccountOption>}
      >
        <div className="flex flex-col gap-4 items-center py-2">
          <p className="text-lg">Connect your first bank account below!</p>
          <ConnectAccountBtn user={user!} />
        </div>
      </FormDrawer>
    );
  }

  return (
    <FormDrawer
      title="Manage Connected Accounts"
      description="Add or remove connected accounts."
      triggerLabel={<AccountOption>Manage Connected Accounts</AccountOption>}
    >
      <div className="flex flex-col justify-center items-center gap-6 pb-4">
        {/* Handle if there are multiple items */}
        {/* {items.map(item => (put below block into here))} */}
        <div className="flex flex-col gap-2 border w-[90%] px-4 py-4 rounded-xl justify-center">
          <div className="flex justify-between px-2">
            <p>Account Name</p>
            <ManageAccountButton accessToken={items.access_token} />
          </div>
          <ul className="flex justify-around">
            {accounts?.map((account) => (
              <ManageAccountItem account={account} key={account.account_id} />
            ))}
          </ul>
        </div>
        <Button className="w-1/2">Connect New Account</Button>
      </div>
    </FormDrawer>
  );
};

export default ManageAccountSection;
