import SectionContainer from "./SectionContainer";
import SectionTitle from "./SectionTitle";

const RecentExpenses = () => {
  // Show 10 most recent. "View All" button that links to expenses page
  return (
    <SectionContainer>
      <SectionTitle>Recent Expenses</SectionTitle>
      <div>Recent Expenses Section</div>
    </SectionContainer>
  );
};

export default RecentExpenses;
