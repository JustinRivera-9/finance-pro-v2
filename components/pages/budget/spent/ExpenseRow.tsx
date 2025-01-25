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
        className="grid grid-cols-[20%_13%_auto] gap-4 border-b w-full border-light/30 text-left py-3"
      >
        <p>{expense.date}</p>
        <p>{formatCurrency(expense.amount, true)}</p>
        <p className="truncate">{expense.description}</p>
      </section>
    );
  }

  return (
    <div
      key={expense.id}
      className="grid grid-cols-[20%_13%_auto_5%] gap-4 border-b w-full border-light/30 text-left py-3 px-4"
    >
      <p>{expense.date}</p>
      <p>{formatCurrency(expense.amount, true)}</p>
      <p className="truncate">{expense.description}</p>
      <ActionBtn expense={expense} expenseToEdit={handleEditExpense} />
    </div>
  );
};

export default ExpenseRow;
