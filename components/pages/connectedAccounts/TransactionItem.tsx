import { Undo2 } from "lucide-react";
import { useState } from "react";
import {
  capitalizePlaidCategory,
  formatCurrency,
  formatExpenseDate,
  formatPlaidDate,
} from "@/lib/utils";
import { format } from "date-fns";
import Image from "next/image";
import type { Transaction } from "plaid";
import type { ApprovedTransactionItem } from "@/types/plaid";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type TransactionItemProps = {
  data: Transaction;
  addTransaction: (transaction: ApprovedTransactionItem) => void;
  removeTransaction: (transaction: ApprovedTransactionItem) => void;
  categories: any[];
};

const TransactionItem = ({
  data,
  addTransaction,
  removeTransaction,
  categories,
}: TransactionItemProps) => {
  const [userCategory, setUserCategory] = useState<string>("");

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

  const handleAdd = (category: string) => {
    setUserCategory(category);
    addTransaction({
      account_id,
      amount,
      authorized_date: formatPlaidDate(authorized_date as string),
      date: formatPlaidDate(date),
      merchant_name,
      logo_url,
      personal_finance_category: capitalizePlaidCategory(
        personal_finance_category?.primary
      ),
      personal_finance_category_icon_url,
      transaction_id,
      name,
      category: category,
      isApproved: true,
      description: name || (merchant_name as string),
    });
  };

  const handleUndo = () => {
    removeTransaction({
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
      category: userCategory,
      isApproved: false,
      description: name || (merchant_name as string),
    });

    setUserCategory("");
  };

  return (
    <>
      <section className="grid grid-cols-[0.5fr,1fr,2fr] items-center py-2">
        <Image
          src={`${logo_url || personal_finance_category_icon_url}`}
          alt="Logo or merchant"
          width={50}
          height={50}
          className="rounded-full"
        />
        <div className="flex flex-col items-center truncate">
          <p className="text-center text-lg text-secondary">
            {formatCurrency(amount)}
          </p>
          <p className="text-right">
            {formatExpenseDate(format(authorized_date || date, "P"))}
          </p>
        </div>
        <div className="flex flex-col gap-2 truncate">
          <p className="text-left font-bold truncate">
            {merchant_name || name}
          </p>
          {userCategory ? (
            <div className="flex gap-2 justify-between items-center">
              <p className="text-lg text-light/70">{userCategory}</p>
              <Undo2 onClick={handleUndo} size={24} />
            </div>
          ) : (
            <Select onValueChange={(value) => handleAdd(value)}>
              <SelectTrigger className="h-fit px-2 py-1">
                <SelectValue
                  placeholder="Assign Category"
                  autoCapitalize="words"
                />
              </SelectTrigger>
              <SelectContent>
                {categories.map((item) => (
                  <SelectItem
                    key={item.id}
                    value={item.category}
                    autoCapitalize="words"
                  >
                    {item.category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>
      </section>
    </>
  );
};

export default TransactionItem;
