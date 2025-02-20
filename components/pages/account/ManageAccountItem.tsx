import React from "react";
import { AccountBase } from "plaid";
import { capitalize } from "@/lib/utils";

const ManageAccountItem = ({ account }: { account: AccountBase }) => {
  return (
    <li className="bg-card p-4 rounded-lg">
      <p className="">{capitalize(account.subtype || account.type)}</p>
    </li>
  );
};

export default ManageAccountItem;
