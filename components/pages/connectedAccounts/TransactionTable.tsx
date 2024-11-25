import type { AccountBase, Transaction } from "plaid";
import TransactionItem from "./TransactionItem";
import { Separator } from "@/components/ui/separator";

const TransactionTable = ({
  transactions,
}: {
  transactions: Transaction[];
  accounts: AccountBase[];
}) => {
  const nonBankTransactions = transactions.filter(
    (item) =>
      item.payment_channel === "online" || item.payment_channel === "in store"
  );

  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-2xl text-accent">Transactions Pending</h1>
      <ul className="flex flex-col gap-2">
        {nonBankTransactions.map((item) => (
          <li className="flex flex-col gap-2" key={item.transaction_id}>
            <TransactionItem data={item} />
            <Separator />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionTable;
