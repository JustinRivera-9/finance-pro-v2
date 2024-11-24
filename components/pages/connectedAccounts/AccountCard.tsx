import type { AccountBase } from "plaid";
import TypeSavings from "./TypeSavings";
import TypeChecking from "./TypeChecking";
import TypeCredit from "./TypeCredit";

const AccountCard = ({ account }: { account: AccountBase }) => {
  const { subtype } = account;

  if (subtype === "savings") return <TypeSavings account={account} />;
  if (subtype === "checking") return <TypeChecking account={account} />;
  if (subtype === "credit card") return <TypeCredit account={account} />;
};

export default AccountCard;
