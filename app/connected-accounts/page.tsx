import PlaidLink from "@/components/auth/PlaidLink";
import React from "react";

const ConnectedAccountsPage = () => {
  return (
    <div className="flex flex-col items-center">
      <h1>Connect Your Bank Accounts</h1>
      <PlaidLink />
    </div>
  );
};

export default ConnectedAccountsPage;
