import { getEditExpense } from "../actions";
import { Expense } from "@/types/types";
import EditComponent from "@/components/pages/spent/EditComponent";

const EditExpensePage = async ({
  params,
}: {
  params: { expenseId: string };
}) => {
  // @ts-ignore
  const expenseData: Expense = await getEditExpense(params.expenseId);

  return <EditComponent expenseData={expenseData} />;
};

export default EditExpensePage;
