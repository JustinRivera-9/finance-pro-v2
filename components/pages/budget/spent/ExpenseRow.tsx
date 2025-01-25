import { formatCurrency } from "@/lib/utils";
import { Expense } from "@/types/types";
import ActionBtn from "./ActionBtn";

const ExpenseRow = ({
  expense,
  readOnly,
  setExpenseToEdit,
}: {
  expense: Expense;
  readOnly?: boolean;
  setExpenseToEdit?: (expense: Expense) => void;
}) => {
  const handleEditExpense = (expense: Expense) => {
    setExpenseToEdit?.(expense);
  };

  if (readOnly) {
    return (
      <section
        key={expense.id}
        className="grid grid-cols-[20%_10%_auto] gap-4 text-left w-full py-3 border-t border-light/30"
      >
        <p>{expense.date}</p>
        <p>{formatCurrency(expense.amount, true)}</p>
        <p className="truncate w-48">{expense.description}</p>
      </section>
    );
  }

  return (
    <section className="flex justify-between border-t w-full border-light/30 text-left py-3 px-3">
      <div key={expense.id} className="grid grid-cols-[20%_15%_auto] gap-4">
        <p>{expense.date}</p>
        <p>{formatCurrency(expense.amount, true)}</p>
        <p className="truncate w-48">{expense.description}</p>
      </div>
      <ActionBtn expense={expense} expenseToEdit={handleEditExpense} />
    </section>
  );
};

export default ExpenseRow;
