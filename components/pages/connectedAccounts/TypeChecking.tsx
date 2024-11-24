import { AccountBase } from "plaid";
import { formatCurrency } from "@/lib/utils";

const TypeChecking = ({ account }: { account: AccountBase }) => {
  const { balances, name, subtype } = account;

  return (
    <div className="bg-card py-2 px-4 rounded-2xl">
      <p>{name}</p>
      <p>Available {formatCurrency(balances.available)}</p>
      <p>Current {formatCurrency(balances.current)}</p>
    </div>
  );
};

export default TypeChecking;
