import { CircleCheck } from "lucide-react";
import { useState } from "react";
import {
  capitalizePlaidCategory,
  formatCurrency,
  formatExpenseDate,
} from "@/lib/utils";
import { format } from "date-fns";
import Image from "next/image";
import type { Transaction } from "plaid";
import { ApprovedTransactionItem } from "@/types/plaid";

type TransactionItemProps = {
  data: Transaction;
  addTransaction: (transaction: ApprovedTransactionItem) => void;
};

const TransactionItem = ({ data, addTransaction }: TransactionItemProps) => {
  const [isConfirmed, setIsConfirmed] = useState<boolean>(false);

  const {
    account_id,
    amount,
    authorized_date,
    date,
    merchant_name,
    logo_url,
    personal_finance_category,
    personal_finance_category_icon_url,
    transaction_id,
    name,
  } = data;

  const handleClick = () => {
    setIsConfirmed((prev) => !prev);

    addTransaction({
      account_id,
      amount,
      authorized_date,
      date,
      merchant_name,
      logo_url,
      personal_finance_category: personal_finance_category?.primary,
      personal_finance_category_icon_url,
      transaction_id,
      name,
    });
  };

  return (
    <>
      <section className="grid grid-cols-[0.5fr,1fr,2fr,0.5fr] gap-4 text-sm items-center py-2">
        <Image
          src={`${logo_url || personal_finance_category_icon_url}`}
          alt="Logo or merchant"
          width={50}
          height={50}
          className="rounded-full"
        />
        <div className="flex flex-col items-center truncate">
          <p className="text-center">{formatCurrency(amount)}</p>
          <p className="text-right">
            {formatExpenseDate(format(authorized_date || date, "P"))}
          </p>
        </div>
        <div className="flex flex-col truncate">
          <p className="text-left">{merchant_name || name}</p>
          <p className="text-left">
            {capitalizePlaidCategory(personal_finance_category?.primary)}
          </p>
        </div>
        <CircleCheck
          style={
            isConfirmed
              ? {
                  color: "#262525",
                  backgroundColor: "#84cc16",
                  borderRadius: "9999px",
                }
              : {
                  color: "#fdfdfd",
                  backgroundColor: "#262525",
                  borderRadius: "9999px",
                }
          }
          onClick={handleClick}
        />
      </section>
    </>
  );
};

export default TransactionItem;
