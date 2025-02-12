"use client";
import type { AccountBase } from "plaid";
import TransactionItem from "./TransactionItem";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { ApprovedTransactionItem } from "@/types/plaid";
import { handleConfirmTransactions } from "@/app/app/connected-accounts/actions";
import { sortPlaidTransactions } from "@/lib/utils";
import Spinner from "@/components/ui/Spinner";

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
  const [isLoading, setisLoading] = useState<boolean>(false);

  // filters out bank related transactions i.e. credit card payments, income, etc.
  const nonBankTransactions = sortPlaidTransactions(
    transactions.filter(
      (item) =>
        item.personal_finance_category?.toLowerCase() !== "loan payments" ||
        item.personal_finance_category?.toLowerCase() !== "income" ||
        +item.amount > 1
    )
  );

  const handleAddTransaction = (transaction: ApprovedTransactionItem) =>
    setApprovedTransactions((prev) => [...prev, transaction]);

  const handleRemoveTransaction = (transaction: ApprovedTransactionItem) =>
    setApprovedTransactions((prev) =>
      prev.filter((item) => item.transaction_id !== transaction.transaction_id)
    );

  const confirmTransactions = async () => {
    setisLoading(true);
    await handleConfirmTransactions(approvedTransactions);
    setApprovedTransactions([]);
    setisLoading(false);
  };

  if (!categories) {
    console.log("Error fetching categories");
    return <h1>Error fetching categories</h1>;
  }

  const expenseCategories = categories.filter(
    (category: any) => category.type === "expense" && !category.isFixed
  );

  return (
    <>
      {approvedTransactions.length > 0 && (
        <button
          onClick={confirmTransactions}
          className="fixed bottom-24 left-1/2 -translate-x-1/2 bg-secondary text-dark bg-opacity-90 font-bold w-3/5 py-3 rounded-full shadow-md z-50"
        >
          {isLoading ? (
            <Spinner
              size="md"
              message="Adding transactions"
              orientation="horizontal"
            />
          ) : (
            "Confirm Transactions"
          )}
        </button>
      )}
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl text-accent text-center">
          Transactions Pending
        </h1>
        <ul className="flex flex-col gap-2">
          {nonBankTransactions!.map((item) => (
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
