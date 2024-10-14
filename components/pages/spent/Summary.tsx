import { CategoryData, Expense } from "@/types/types";

type SummaryProps = {
  expenses: Expense[];
  categories: CategoryData[];
};

const Summary = ({ expenses, categories }: SummaryProps) => {
  return <div>Summary</div>;
};

export default Summary;
