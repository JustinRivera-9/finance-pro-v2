import SectionContainer from "./SectionContainer";
import SectionTitle from "./SectionTitle";
import { getCategories } from "@/app/app/budget/actions";
import { FixedExpenseCarousel } from "./FixedExpenseCarousel";

const UpcomingExpenses = async () => {
  const categories = await getCategories();

  return (
    <SectionContainer>
      <SectionTitle>Upcoming Expenses</SectionTitle>
      {/* @ts-ignore */}
      <FixedExpenseCarousel categories={categories} />
    </SectionContainer>
  );
};

export default UpcomingExpenses;
