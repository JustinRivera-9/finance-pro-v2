import { getExpenses } from "@/app/app/spent/[month]/actions";
import { OverviewChart } from "./OverviewChart";
import SectionContainer from "./SectionContainer";
import { getCategories } from "@/app/app/planned/actions";
import { prepareBudgetOverviewPieChartData } from "@/lib/utils";

const BudgetOverview = async () => {
  const [expenses, categories] = await Promise.all([
    getExpenses(),
    getCategories(),
  ]);

  if (expenses.error || !expenses.expenses || !categories) {
    return <p>There was an error getting data</p>;
  }

  const preparedData = prepareBudgetOverviewPieChartData(
    expenses.expenses,
    // @ts-ignore
    categories
  );

  return (
    <SectionContainer>
      <OverviewChart data={preparedData} />
    </SectionContainer>
  );
};

export default BudgetOverview;
