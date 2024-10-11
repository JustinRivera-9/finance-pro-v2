import Summary from "@/components/pages/spent/Summary";
import { getExpenses } from "./actions";
import ExpenseSection from "@/components/pages/spent/ExpenseSection";

const SpentPage = async () => {
  const { expenses, error } = await getExpenses();

  if (error) {
    return <div>Error: {error.toString()}</div>;
  }

  return (
    <section>
      <Summary />
      {expenses && <ExpenseSection expenses={expenses} />}
    </section>
  );
};

export default SpentPage;
