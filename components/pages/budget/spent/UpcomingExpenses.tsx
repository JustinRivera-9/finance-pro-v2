import SectionContainer from "./SectionContainer";
import SectionTitle from "./SectionTitle";
import { FixedExpenseCarousel } from "./FixedExpenseCarousel";
import { CategoryData } from "@/types/types";

const UpcomingExpenses = ({ categories }: { categories: CategoryData[] }) => {
  return (
    <SectionContainer>
      <SectionTitle>Upcoming Expenses</SectionTitle>
      <FixedExpenseCarousel categories={categories} />
    </SectionContainer>
  );
};

export default UpcomingExpenses;
