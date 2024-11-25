import {
  capitalizePlaidCategory,
  formatCurrency,
  formatExpenseDate,
} from "@/lib/utils";
import { format } from "date-fns";
import Image from "next/image";
import type { Transaction } from "plaid";
import ConfirmTransactionBtn from "./ConfirmTransactionBtn";

const TransactionItem = ({ data }: { data: Transaction }) => {
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
        <ConfirmTransactionBtn />
      </section>
    </>
  );
};

export default TransactionItem;
