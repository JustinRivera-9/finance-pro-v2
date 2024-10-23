import FormDrawer from "@/components/ui/FormDrawer";
import { getEditExpense } from "../actions";
import ExpenseForm from "@/components/pages/spent/ExpenseForm";
import { Expense } from "@/types/types";

const EditExpensePage = async ({
  params,
}: {
  params: { expenseId: string };
}) => {
  const expenseData: Expense = await getEditExpense(params.expenseId);
  console.log(expenseData);

  return (
    <FormDrawer title={`Edit Expense`} color="light" open>
      <ExpenseForm expenseData={expenseData} category={expenseData.category} />
    </FormDrawer>
  );
};

export default EditExpensePage;
