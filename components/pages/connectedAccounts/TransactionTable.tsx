"use client";
import type { AccountBase } from "plaid";
import TransactionItem from "./TransactionItem";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { ApprovedTransactionItem } from "@/types/plaid";
import { handleConfirmTransactions } from "@/app/app/connected-accounts/actions";

type TransactionTableProps = {
  transactions: ApprovedTransactionItem[];
  accounts: AccountBase[];
  categories: any[];
};

const TransactionTable = ({
  transactions,
  accounts,
  categories,
}: TransactionTableProps) => {
  const [approvedTransactions, setApprovedTransactions] = useState<
    ApprovedTransactionItem[]
  >([]);

  // filters out bank related transactions i.e. credit card payments, income, etc.
  const nonBankTransactions = transactions.filter(
    (item) =>
      item.payment_channel === "online" || item.payment_channel === "in store"
  );

  const handleAddTransaction = (transaction: ApprovedTransactionItem) =>
    setApprovedTransactions((prev) => [...prev, transaction]);

  const handleRemoveTransaction = (transaction: ApprovedTransactionItem) =>
    setApprovedTransactions((prev) =>
      prev.filter((item) => item.transaction_id !== transaction.transaction_id)
    );

  if (!categories) {
    console.log("Error fetching categories");
    return <h1>Error fetching categories</h1>;
  }

  const expenseCategories = categories.filter(
    (category: any) => category.type === "expense" && !category.isFixed
  );

  return (
    <>
      {approvedTransactions.length ? (
        <button
          onClick={() => handleConfirmTransactions(approvedTransactions)}
          className="fixed bottom-24 bg-secondary text-dark bg-opacity-85 font-bold px-6 py-3 rounded-full shadow-md z-50"
        >
          Confirm Transactions
        </button>
      ) : null}
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl text-accent text-center">
          Transactions Pending
        </h1>
        <ul className="flex flex-col gap-2">
          {nonBankTransactions.map((item) => (
            <li className="flex flex-col gap-2" key={item.transaction_id}>
              <TransactionItem
                data={item}
                addTransaction={handleAddTransaction}
                removeTransaction={handleRemoveTransaction}
                categories={expenseCategories}
              />
              <Separator />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default TransactionTable;
