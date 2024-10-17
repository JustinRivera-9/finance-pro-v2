import FormDrawer from "@/components/ui/DrawerCard";
import ExpenseForm from "./ExpenseForm";

const TriggerLabel = () => (
  <p className="text-sm font-semibold py-2 bg-accent text-dark px-2 border border-accent rounded-lg">
    Add Expense
  </p>
);

export const AddExpenseBtn = ({ category }: { category: string }) => {
  return (
    <FormDrawer
      title={`New ${category} Expense`}
      triggerLabel={<TriggerLabel />}
      color="accent"
    >
      <ExpenseForm category={category} />
    </FormDrawer>
  );
};
