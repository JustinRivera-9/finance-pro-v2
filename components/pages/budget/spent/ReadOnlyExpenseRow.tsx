import { formatCurrency } from "@/lib/utils";
import { Expense } from "@/types/types";

const ReadOnlyExpenseRow = ({
  expense,
  drawer,
}: {
  expense: Expense;
  drawer?: boolean;
}) => {
  if (drawer) {
    return (
      <section
        key={expense.id}
        className="grid grid-cols-[1fr_0.75fr_2.5fr] min-w-[90%] mx-auto gap-4 py-2 pl-2 border-t border-light/30"
      >
        <p className="text-secondary">{expense.date}</p>
        <p>{formatCurrency(expense.amount, true)}</p>
        <p className="truncate w-44">{expense.description}</p>
      </section>
    );
  }

  return (
    <section
      key={expense.id}
      className="grid grid-cols-[1fr_0.75fr_2.5fr] min-w-[90%] gap-4 py-2 pl-2 border-t border-light/30"
    >
      <p>{expense.date}</p>
      <p>{formatCurrency(expense.amount, true)}</p>
      <p className="truncate w-44">{expense.description}</p>
    </section>
  );
};

export default ReadOnlyExpenseRow;
