import OverviewChart from "./OverviewChart";
import SectionContainer from "./SectionContainer";
import SectionTitle from "./SectionTitle";

const BudgetOverview = () => {
  return (
    <SectionContainer>
      <SectionTitle>Budget Overview</SectionTitle>
      <OverviewChart />
    </SectionContainer>
  );
};

export default BudgetOverview;
