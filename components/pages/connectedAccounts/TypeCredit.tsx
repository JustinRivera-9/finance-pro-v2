import { AccountBase } from "plaid";
import { formatCurrency } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";

const TypeCredit = ({ account }: { account: AccountBase }) => {
  const { balances, name, subtype } = account;

  return (
    <section className="flex flex-col gap-2 bg-card py-2 px-4 rounded-2xl">
      <div className="flex flex-col items-start justify-between">
        <p className="text-lg">{name}</p>
        <p className="text-xs text-secondary">{subtype}</p>
      </div>
      <Separator className="bg-page rounded-full" />
      <div className="flex justify-around">
        <div className="flex flex-col">
          <p className="text-light/70">Limit</p>
          <p className="text-lg">{formatCurrency(balances.limit)}</p>
        </div>
        <div className="flex flex-col">
          <p className="text-light/70">Current</p>
          <p className="text-lg">{formatCurrency(balances.current)}</p>
        </div>
      </div>
    </section>
  );
};

export default TypeCredit;
