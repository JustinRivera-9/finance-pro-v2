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
        className="grid grid-cols-[1fr_0.75fr_2.5fr] py-3 border-t border-light/30"
      >
        <p>{expense.date}</p>
        <p>{formatCurrency(expense.amount, true)}</p>
        <p className="truncate w-48">{expense.description}</p>
      </section>
    );
  }

  return (
    <section
      key={expense.id}
      className="grid grid-cols-[1fr_0.75fr_2.5fr_0.25fr] py-3 px-4 border-t border-light/30"
    >
      <p>{expense.date}</p>
      <p>{formatCurrency(expense.amount, true)}</p>
      <p className="truncate w-48">{expense.description}</p>
      <ActionBtn expense={expense} expenseToEdit={handleEditExpense} />
    </section>
  );
};

export default ExpenseRow;
