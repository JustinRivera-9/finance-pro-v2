import type { Expense } from "@/types/types";

type ExpenseSectionProps = {
  month: string;
  expenses: Expense[];
};

const ExpenseSection = async ({ month, expenses }: ExpenseSectionProps) => {
  console.log(expenses);
  return (
    <section>
      <div>Expense Section</div>
      <div>Selected Month: {month}</div>
    </section>
  );
};

export default ExpenseSection;
